import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RestserviceService } from '../restservice.service';
import { Product } from '../world';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: Product = new Product();
  progressbarvalue: number = 0;
  timeleft: number = 0;
  lastupdate: number = 0;
  @Input()
  set prod(value: Product) {
    this.product = value;

  }
  @Output() notifyProduction: EventEmitter<Product> = new
    EventEmitter<Product>();

  server: string;
  constructor(private service: RestserviceService) {
    this.server = service.getServer();

  }

  ngOnInit(): void {
    setInterval(() => { this.calcScore(); }, 100);
  }
  startFabrication() {
    this.product.timeleft = this.product.vitesse;
    this.lastupdate = Date.now();

  }
  calcScore() {
    if (this.product.timeleft != 0) {
     
      this.product.timeleft = this.product.timeleft - (Date.now() - this.lastupdate)
      this.lastupdate=Date.now();
    
    if (this.product.timeleft <= 0) {
      this.product.timeleft = 0;
      this.progressbarvalue = 0;
      // on prévient le composant parent que ce produit a généré son revenu.
      this.notifyProduction.emit(this.product);
      
    } else {
      this.progressbarvalue = ((this.product.vitesse - this.product.timeleft) / this.product.vitesse) * 100;
    }
  }
}



}

