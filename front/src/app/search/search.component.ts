import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  @Output()
  onValorChange = new EventEmitter<string>();

  valor: string = '';
  i: number = 0;
  public onClick(evento: MouseEvent) {
    console.log('Valor actual: ' + this.valor);

    this.onValorChange.emit(this.valor);
    this.valor = 'Click ' + this.i++;
    console.log(this.valor);
  }
}
