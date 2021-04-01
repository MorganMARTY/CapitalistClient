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
  _qtmulti : string="" //J'ai ajouté ça je l'ai juste déplacé là parce que ça marchait pas à l'endroit où ça devait marcher XD #bidouille 
  world: World = new World(); // Alors je sais pas si j'ai le droit de faire ça mais je voulais import le world pour récupérer le money dans _qmultim
  n : number = 0; 
  i : number = 0; // pour faire tourner la boucle for du calcMaxCanBuy
  s : number = 0; // pour faire la somme des pourcentages de croissance pour la boucle for 
  mult : number = qtmulti; 
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

calcMaxCanBuy(){
  //x : number = this.product.cout ; 
  //c = this.product.croissance; 
  for  this.i=0, qmulti, i++; { // La j'ai un pb de i alors que pour s ça marche 
    s = this.s + this.product.croissance^qmulti;
  }
  if this.world.money - (this.product.cout*this.s)> 0) ; {   // Alors la je sais que ça marche pas parce que qtmulti c'est un string mais du coup on peut le mettre sous forme int ? 
      //Alors bouton cliquable 
  }
  
}

//_qtmulti : string;        //Je pense faut l'initialiser avant j'ai test mais pas réussis obviously 
 @Input()
 set qtmulti(value: string) {
 this._qtmulti = value;
 if (this._qtmulti && this.product) this.calcMaxCanBuy();
 }
 set qtmultim(value: string) {      // Et la il a dit de faire de la même manière donc j'ai test avec l'initialisation du world au dessus
  this._qtmulti = value;
  if (this._qtmulti && this.product) this.world.money;
 }




}

