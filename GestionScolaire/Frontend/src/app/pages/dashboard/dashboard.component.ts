import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DepenseService } from 'src/app/services/depense/depense.service';
import { EncaissementService } from 'src/app/services/encaissement/encaissement.service';
import { EnseignantService } from 'src/app/services/enseignant/enseignant.service';
import { PersonnelService } from 'src/app/services/personnel/personnel.service';
import { SalaireService } from 'src/app/services/salaire/salaire.service';
import { EleveService } from '../../services/eleve/eleve.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  counteleve = 0;
  countenseignant = 0;
  countpersonnel = 0;
  feminineleve = 0;
  masculuneleve = 0;
  femininenseignant = 0;
  masculunenseignant = 0;
  femininpersonnel = 0;
  masculunpersonnel = 0;
  trafficChartData;
  doughnutPieChartData;
  doughnutPieChartDataP;
  depenses;
  lineChartData;
  lineChartLabels;
  barChartData;
  barChartLabels;
  depense = 0;
  encaissement = 0;
  recette;
  toggleProBanner(event) {
    console.log("123");
    event.preventDefault();
    document.querySelector('body').classList.toggle('removeProbanner');
  }
  constructor(private eleveService: EleveService, private encaissementService: EncaissementService, private salaireService: SalaireService, private depenseService: DepenseService, private enseignantService: EnseignantService, private personnelService: PersonnelService) { }
  ngOnInit() {
    this.eleveService.allWhitoutPagination().subscribe(
      data => {
        data.forEach(
          val => {
            this.counteleve += 1;
            if (val.genre == "feminin")
              this.feminineleve += 1;
            else
              this.masculuneleve += 1;
          }
        )
        this.trafficChartData = [
          {
            data: [this.feminineleve, this.masculuneleve],
          }
        ];
      }
    )
    this.enseignantService.allWhitoutPagination().subscribe(
      data => {
        data.forEach(
          val => {
            this.countenseignant += 1;
            if (val.genre == "feminin")
              this.femininenseignant += 1;
            else
              this.masculunenseignant += 1;
          }
        )
        this.doughnutPieChartData = [
          {
            data: [this.femininenseignant, this.masculunenseignant],
          }
        ];
      }
    )
    this.personnelService.allWhitoutPagination().subscribe(
      data => {
        data.forEach(
          val => {
            this.countpersonnel += 1;
            if (val.genre == "feminin")
              this.femininpersonnel += 1;
            else
              this.masculunpersonnel += 1;
          }
        )
        this.doughnutPieChartDataP = [
          {
            data: [this.femininpersonnel, this.masculunpersonnel],
          }
        ];
      }
    )
    this.depenseService.Desc().subscribe((data) => {
      let donnee = [];
      let label = [];
      data.forEach(
        val => {
          donnee = [
            ...donnee,
            val[12]
          ];
          this.depense += val[12];
          label = [
            ...label,
            moment(val[11]).format("MM/YYYY")
          ];
        }
      );
      this.lineChartLabels = label;
      this.lineChartData = [{
        label: 'Montant',
        data: donnee,
        borderWidth: 2,
        fill: false
      }];
    })
    this.encaissementService.allDesc().subscribe(
      (data) => {
        let donnee = [];
        let label = [];
        data.forEach(
          val => {
            donnee = [
              ...donnee,
              val[8]
            ];
            this.encaissement += val[8];
            label = [
              ...label,
              moment(val[7]).format("MM/YYYY")
            ]
          }
        )
        this.recette = this.encaissement - this.depense;
        this.barChartData = [{
          label: 'Montant',
          data: donnee,
          borderWidth: 1,
          fill: false
        }];
        this.barChartLabels =label;
      }
    )
  }
  date: Date = new Date();
  trafficChartLabels = ["Nombre total de fille", "Nombre total de garçon"];
  trafficChartOptions = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true
    },
    legend: false,
  };

  trafficChartColors = [
    {
      backgroundColor: [
        'rgba(177, 148, 250, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(132, 217, 210, 1)'
      ],
      borderColor: [
        'rgba(177, 148, 250, .2)',
        'rgba(254, 112, 150, .2)',
        'rgba(132, 217, 210, .2)'
      ]
    }
  ];

  doughnutPieChartLabels = ["Nombre total de femme", "Nombre total d'homme"];

  doughnutPieChartOptions = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true
    },
    legend: false,
  };

  doughnutPieChartColors = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ]
    }
  ];
  lineChartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    legend: {
      display: false
    },
  };

  lineChartColors = [
    {
      borderColor: 'rgba(255,99,132,1)'
    }
  ];
  barChartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    legend: {
      display: false
    },
    elements: {
      point: {
        radius: 0
      }
    }
  };
  barChartColors = [
    {
      backgroundColor: [
        'rgba(177, 148, 250, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(132, 217, 210, 1)',
        'rgb(250, 179, 148)',
        'rgb(244, 119, 217)',
        'rgb(221, 250, 148)',
        'rgb(148, 235, 250)',
        'rgb(48, 64, 239)',
        'rgb(239, 163, 48)',
        'rgb(243, 24, 31)'
      ],
      borderColor: [
        'rgba(177, 148, 250, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(132, 217, 210, 1)',
        'rgb(250, 179, 148)',
        , 'rgb(244, 119, 217)',
        'rgb(221, 250, 148)',
        'rgb(148, 235, 250)',
        'rgb(48, 64, 239)',
        'rgb(239, 163, 48)',
        'rgb(243, 24, 31)'
      ]
    }
  ];
}
