import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RestserviceService } from '../restservice.service';
import { World, Product } from '../world';

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
  quantitemax = 0;
  _qtmulti: string = ""
  world: World = new World(); // Alors je sais pas si j'ai le droit de faire ça mais je voulais import le world pour récupérer le money dans _qmultim
  n: number = 0;
  i: number = 0; // pour faire tourner la boucle for du calcMaxCanBuy
  s: number = 0; // pour faire la somme des pourcentages de croissance pour la boucle for 
  _money: number = 0;
  prix_actuel = 0;
  prix = 4;
  cout_total: number = 0;
  progressbar: any;
  //mult : number = this.qtmulti; 
  @Input()
  set prod(value: Product) {
    this.product = value;
    this.prix_actuel = this.product.cout;
    if (this.product && this.product.timeleft > 0) {
      this.lastupdate = Date.now();
      let progress = (this.product.vitesse - this.product.timeleft) /
        this.product.vitesse;
      this.progressbar.set(progress);
      this.progressbar.animate(1, { duration: this.product.timeleft });
    }


  }
  @Input()
  set money(value: number) {
    this._money = value;
    //console.log(this._money);
    if (this._money && this.product) this.calcMaxCanBuy();
  }


  @Input()
  set qtmulti(value: string) {
    this._qtmulti = value;
    if (this._qtmulti && this.product) this.calcMaxCanBuy();
  }

  @Output()
  notifyProduction: EventEmitter<Product> = new EventEmitter<Product>();

  @Output()
  notifyPurchase: EventEmitter<number> = new EventEmitter<number>();

  server = "http://localhost:8080/";
  constructor(private service: RestserviceService) {

  }

  ngOnInit(): void {
    setInterval(() => { this.calcScore(); }, 100);
    this.progressbarvalue = 0;
    this.calculPrix("X1");
  }
  startFabrication() {
    if (this.product.quantite != 0) {
      this.product.timeleft = this.product.vitesse;
      this.lastupdate = Date.now();
    }

  }
  calcScore() {
    if (this.product.managerUnlocked && this.product.timeleft == 0) {
      this.startFabrication();
    }
    if (this.product.timeleft != 0) {
      this.product.timeleft = this.product.vitesse - (Date.now() - this.lastupdate);
      if (this.product.timeleft <= 0) {
        this.product.timeleft = 0;
        this.progressbarvalue = 0;
        this.notifyProduction.emit(this.product);

      }
      else if (this.product.timeleft > 0) {
        this.progressbarvalue = ((this.product.vitesse - this.product.timeleft) / this.product.vitesse) * 100;
      }
    }
  }
  calculPrix(qtmulti: string) {
    if (qtmulti == "X1") {
      this.prix = this.product.cout;
    }
    else if (qtmulti == "X10") {
      this.prix = this.product.cout * ((1 - (this.product.croissance ** 10)) / (1 - this.product.croissance));
    }
    else if (qtmulti == "X100") {
      this.prix = this.product.cout * ((1 - (Math.pow(this.product.croissance, 100))) / (1 - this.product.croissance));
    }
    else {
      this.prix = this.product.cout * ((1 - Math.pow(this.product.croissance, this.quantitemax)) / (1 - this.product.croissance));
    }
  }

  achat() {
    switch (this._qtmulti) {
      case "X1":
        this.cout_total = this.product.cout;
        this.product.cout = this.product.croissance * this.product.cout;

        this.product.quantite += 1;
        this.calculPrix(this._qtmulti);
        break;
      case "X10":
        this.cout_total = this.product.cout * ((1 - (this.product.croissance ** 10)) / (1 - this.product.croissance));
        this.product.cout = (this.product.croissance ** 10) * this.product.cout;
        this.product.quantite += 10;
        this.calculPrix(this._qtmulti);
        break;
      case "X100":
        this.cout_total = this.product.cout * ((1 - (Math.pow(this.product.croissance, 100))) / (1 - this.product.croissance));
        this.product.cout = (this.product.croissance ** 100) * this.product.cout;
        this.product.quantite += 100;
        this.calculPrix(this._qtmulti);
        break;
      case "XMAX":
        this.cout_total = this.product.cout * ((1 - Math.pow(this.product.croissance, this.quantitemax)) / (1 - this.product.croissance));
        this.product.cout = (this.product.croissance ** this.quantitemax) * this.product.cout;
        this.product.quantite += this.quantitemax;
        this.calculPrix(this._qtmulti);
        break;
    }
    this.prix_actuel = this.cout_total;

    this.notifyPurchase.emit(this.cout_total);

  }

  calcMaxCanBuy() {
    let qtemax = ((Math.log(1 - ((this._money * (1 - this.product.croissance)) / this.product.cout)) / Math.log(this.product.croissance)));
    if (qtemax < 0) {
      this.quantitemax = 0;
    } else {
      this.quantitemax = Math.floor(qtemax);
    }
  }

}