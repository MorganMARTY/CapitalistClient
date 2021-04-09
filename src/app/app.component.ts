import { Component, QueryList, ViewChildren } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { RestserviceService } from './restservice.service';
import { World, Product, Pallier } from './world';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @ViewChildren(ProductComponent)
  public produits!: QueryList<ProductComponent>;
  title = 'CapitalistClient';
  world: World = new World();
  server: string='';
  p:Product = new Product();
  qtmulti : string ="X1";
  username: string | null; 
  showManagers = false;
  pallier : Pallier = new Pallier();
  manager : string = ''; 
  MatSnackBar : any;

  
  constructor(private service: RestserviceService,) {
    this.server = service.getServer();
    this.username = localStorage.getItem("username");
    if (this.username == null) {
      this.username = 'Sorcier' + Math.floor(Math.random() * 10000)
    }

      
    service.getWorld().then(
    world => {
    this.world = world;
    });
    }
   onProductionDone(p : Product){
      this.world.money=this.world.money + p.quantite*p.revenu;
      this.world.score = this.world.score + p.quantite*p.revenu;
    }
    onPurchaseDone(cout_total_achat: number){
      this.world.money =  this.world.money - cout_total_achat;
      this.world.score = this.world.score - cout_total_achat;
    }
    onUsernameChanged() {
      if (this.username != null) {
        localStorage.setItem("username", this.username);     
      }
    }
  
    achatm(){

      switch(this.qtmulti){
          case "X1":
            this.qtmulti="X10";
            for (let produit of this.produits) {
              produit.calculPrix(this.qtmulti);
            }
            break;
          case "X10":
            this.qtmulti="X100";
            for (let produit of this.produits) {
              produit.calculPrix(this.qtmulti);
            }
            break;
          case "X100":
            this.qtmulti="XMAX";
            for (let produit of this.produits) {
              produit.calculPrix(this.qtmulti);
            }
            break;
          case  "XMAX":
            this.qtmulti="X1";
            for (let produit of this.produits) {
              produit.calculPrix(this.qtmulti);
            }
            break;
      }
    }



    fshowManagers(){
      this.showManagers = true;
    }
    hireManager(manager : Pallier){
      if (this.world.money >= manager.seuil && this.world.products.product[manager.idcible-1].quantite>0){
        this.world.money = this.world.money - manager.seuil;
        manager.unlocked = true;
        this.world.products.product[manager.idcible-1].managerUnlocked = true;
        }

    }
 
}
