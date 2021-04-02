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
  _qtmulti : string="" //J'ai ajouté ça je l'ai juste déplacé là parce que ça marchait pas à l'endroit où ça devait marcher XD #bidouille 
  world: World = new World(); // Alors je sais pas si j'ai le droit de faire ça mais je voulais import le world pour récupérer le money dans _qmultim
  n : number = 0; 
  i : number = 0; // pour faire tourner la boucle for du calcMaxCanBuy
  s : number = 0; // pour faire la somme des pourcentages de croissance pour la boucle for 
  _money: number = 0;
  prix_actuel = 0;
  cout_total_achat: number=0;
  //mult : number = this.qtmulti; 
  @Input()
  set prod(value: Product) {
    this.product = value;
    this.prix_actuel = this.product.cout;
    
  }
  @Input()
  set money(value: number) {
  this._money = value;
  //console.log(this._money);
  if (this._money && this.product) this.calcMaxCanBuy();
}

//_qtmulti : string;        //Je pense faut l'initialiser avant j'ai test mais pas réussis obviously 
 @Input()
 set qtmulti(value: string) {
 this._qtmulti = value;
 if (this._qtmulti && this.product) this.calcMaxCanBuy();
 }
 /*set qtmultim(value: string) {      // Et la il a dit de faire de la même manière donc j'ai test avec l'initialisation du world au dessus
  this._qtmulti = value;
  if (this._qtmulti && this.product) this.world.money;
 }*/
  @Output() 
    notifyProduction: EventEmitter<Product> = new EventEmitter<Product>();
  
  @Output()
    notifyPurchase: EventEmitter<number> = new EventEmitter<number>();

  server= "http://localhost:8080/";
  constructor(private service: RestserviceService) {
  
  }

  ngOnInit(): void {
    setInterval(() => { this.calcScore(); }, 100);
    this.progressbarvalue=0;
  }
  startFabrication() {
    this.product.timeleft = this.product.vitesse;
    this.lastupdate = Date.now();

  }
  calcScore() {
    if (this.product.timeleft != 0) {
     
      this.product.timeleft = this.product.vitesse - (Date.now() - this.lastupdate);
      //this.lastupdate=Date.now();
    
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

achat() {
  console.log("achat: "+this.product.name);
  switch (this._qtmulti) {
    case "X1":
      this.cout_total_achat = this.product.cout;
      this.product.cout = this.product.croissance * this.product.cout;
      
      this.product.quantite += 1;
      
      break;
    case "X10":
      this.cout_total_achat = this.product.cout *((1 - (this.product.croissance ** 10))/(1  - this.product.croissance));
      this.product.cout = (this.product.croissance ** 10) * this.product.cout;
      this.product.quantite += 10;
      break;
    case "X100":
      this.cout_total_achat = this.product.cout *((1 - (Math.pow(this.product.croissance,100)) )/(1  - this.product.croissance));
      this.product.cout = (this.product.croissance ** 100) * this.product.cout;
      this.product.quantite += 100;
      break;
    case "XMAX":
      this.cout_total_achat = this.product.cout *((1 - Math.pow(this.product.croissance,this.quantitemax))/(1  - this.product.croissance));
      this.product.cout = (this.product.croissance ** this.quantitemax) * this.product.cout;
      this.product.quantite += this.quantitemax;
      break;
  }
  this.prix_actuel = this.cout_total_achat;
  
this.notifyPurchase.emit(this.cout_total_achat);

}

calcMaxCanBuy(){
  let qtemax = ((Math.log(1 - ((this._money * (1 - this.product.croissance)) / this.product.cout)) / Math.log(this.product.croissance)));
  if(qtemax < 0){
    this.quantitemax=0;
  }else{
    this.quantitemax= Math.floor(qtemax);
  }
}





}

