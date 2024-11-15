import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { Product } from "../../../model/product";
import { Columns, ColumnType, TableWrapperTable } from "../../../shared/components/table-wrapped/table-wrapper-table";
import { ProductService } from "../../../service/product.service";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { CurrencyPipe } from "@angular/common";

@Component({
  selector: 'app-product-display-datatable',
  standalone: true,
  imports: [
    TableWrapperTable,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSort,
    CurrencyPipe
  ],
  templateUrl: './product-display-datatable.component.html',
  styleUrl: './product-display-datatable.component.scss'
})
export class ProductDisplayDatatableComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  products: Product[] = [];
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
      definition: 'price_per_unit',
      header: 'Preço Unidade',
      type: ColumnType.MONEY,
      cell: (product: Product) => product.price_per_unit
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
      header: 'Preço Total',
      type: ColumnType.MONEY,
      cell: (product: Product) => product.price
    },
  ];
  displayedColumns: string[] = [...this.columns.map(c => c.definition)];
  pageSizeOptions = [5, 10, 20, 50, 100, 150, 200];

  constructor(private readonly productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.products.subscribe((products: Product[]) => {
      this.products = products;
      this.dataSource.data = products
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sumPriceProducts(): number {
    return this.products.reduce(
      (total, product) => total + (product.price ?? 0), 0);
  }

}
