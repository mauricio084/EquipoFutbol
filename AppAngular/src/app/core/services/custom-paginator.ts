import { MatPaginator, MatPaginatorIntl } from '@angular/material';

export class CustomPaginator extends MatPaginatorIntl {
  constructor() {
    super();
    this.nextPageLabel = 'Siguiente';
    this.previousPageLabel = 'Anterior';
    this.itemsPerPageLabel = 'Items por pagina';
  }
}