import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  @Output() filtersChanged = new EventEmitter<any>();
   //FILTROS
   nivel: string | null = null;
   nivelCompetitivo: string | null = null;
   region: string | null = null;
   texto: string | null = null;
   username: string | null = null;


  constructor() { }

  ngOnInit(): void {
  }

  updateFilters() {
    // Obtén los valores de los filtros actualizados
    const filters = {
      nivel: this.nivel,
      nivelCompetitivo: this.nivelCompetitivo,
      region: this.region,
      username: this.username,
      texto: this.texto
    };
  
    // Emite el evento con los valores de los filtros
    this.filtersChanged.emit(filters);
  }

}
