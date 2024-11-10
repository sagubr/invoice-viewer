import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatHeaderRowDef, MatNoDataRow, MatRowDef, MatTableDataSource, MatTableModule } from "@angular/material/table";
import { Product } from "../../model/product";
import { Columns, ColumnType, TableWrapperTable } from "../../shared/components/table-wrapped/table-wrapper-table";
import { ProductService } from "../../service/product.service";

@Component({
  selector: 'app-product-display-datatable',
  standalone: true,
  imports: [
    TableWrapperTable,
    MatPaginator,
    MatHeaderRowDef,
    MatRowDef,
    MatSort,
    MatNoDataRow,
    MatTableModule
  ],
  templateUrl: './product-display-datatable.component.html',
  styleUrl: './product-display-datatable.component.scss'
})
export class ProductDisplayDatatableComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>([]);
  columns: Columns<Product>[] = [
    {
      definition: 'date',
      header: 'Processado em',
      type: ColumnType.DATE,
      cell: (product: Product) => product.date
    },
    {
      definition: 'name',
      header: 'Estabelecimento',
      type: ColumnType.TEXT,
      cell: (product: Product) => product.name
    },
    {
      definition: 'description',
      header: 'Produto',
      type: ColumnType.TEXT,
      cell: (product: Product) => product.description
    },
    {
      definition: 'quantity',
      header: 'Quantidade',
      type: ColumnType.NUMBER,
      cell: (product: Product) => product.quantity
    },
    {
      definition: 'unit_of_measure',
      header: 'Unidade de Medida',
      type: ColumnType.TEXT,
      cell: (product: Product) => product.unit_of_measure
    },
    {
      definition: 'price',
      header: 'Preço',
      type: ColumnType.MONEY,
      cell: (product: Product) => product.price
    },
  ];
  displayedColumns: string[] = [...this.columns.map(c => c.definition)];
  pageSizeOptions = [5, 10, 20, 50, 100];

  constructor(private readonly productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.products.subscribe((product: Product[]) => {
      this.dataSource.data = product
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}