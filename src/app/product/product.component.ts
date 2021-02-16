import { Component, Input, OnInit } from '@angular/core';
import { RestserviceService } from '../restservice.service';
import { Product } from '../world';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: Product = new Product();
  @Input()
set prod(value:Product){
  this.product = value;
}
server: string;
constructor(private service: RestserviceService) {
  this.server = service.getServer();
  
  }

  ngOnInit(): void {
  }

}
