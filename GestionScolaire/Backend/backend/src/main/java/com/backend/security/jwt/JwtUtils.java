package com.backend.security.jwt;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.backend.security.services.UserDetailsImpl;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@NoArgsConstructor
@Slf4j
@Component
public class JwtUtils {

    @Value("${gestionscol.app.jwtSecret}")
    private String jwtSecret;

    @Value("${gestionscol.app.jwtExpirationMs}")
    private int jwtExpirationMs;
    Date now = new Date();
    Date expiryDate = new Date(now.getTime() + jwtExpirationMs);
    public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60;

    public String generateJwtToken(UserDetailsImpl userDetails) {

        return Jwts.builder()
                .setSubject(Long.toString(userDetails.getId()))
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .claim("username",userDetails.getUsername())
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
                .signWith(SignatureAlgorithm.HS512, jwtSecret).compact();}

    public Long getUserIdFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody();
        return Long.parseLong(claims.getSubject());
    }
    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
            log.error("Invalid JWT signature: ", e);
        } catch (MalformedJwtException e) {
            log.error("Invalid JWT token: ", e);
        } catch (ExpiredJwtException e) {
            log.error("JWT token is expired: ", e);
        } catch (UnsupportedJwtException e) {
            log.error("JWT token is unsupported: ", e);
        } catch (IllegalArgumentException e) {
            log.error("JWT claims string is empty: ", e);
        }

        return false;
    }
}
