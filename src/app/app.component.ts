import { Component, QueryList, ViewChildren } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { RestserviceService } from './restservice.service';
import { World, Product, Pallier } from './world';
import {MatSnackBar} from '@angular/material/snack-bar';

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
  server: string = '';
  p: Product = new Product();
  qtmulti: string = "X1";
  username="";
  showManagers = false;
  pallier: Pallier = new Pallier();
  manager: string = '';
  MatSnackBar: string ='';
  badgeManagers : number = 0;	
  hired : number = 0;



  constructor(private service: RestserviceService, private snackBar: MatSnackBar) {
    this.server = service.getServer();
    this.username = localStorage.getItem("username") || 'Sorcier' + Math.floor(Math.random() * 10000);
    this.service.user=this.username;
    service.getWorld().then(
      world => {
        this.world = world;
        this.badgeUpgrades();
      });
  }
  onProductionDone(p: Product) {
    this.world.money = this.world.money + p.quantite * p.revenu;
    this.world.score = this.world.score + p.quantite * p.revenu;
    this.service.putProduct(p);
    this.badgeUpgrades();
  }
  onPurchaseDone(cout_total_achat: number) {
    this.world.money = this.world.money - cout_total_achat;
    
  }
  onUsernameChanged() {
    localStorage.setItem("username", this.username);
    this.service.user = this.username;
    this.service.getWorld().then(
    world => {
      this.world = world;
      this.badgeUpgrades();
    });
  }

  achatm() {

    switch (this.qtmulti) {
      case "X1":
        this.qtmulti = "X10";
        for (let produit of this.produits) {
          produit.calculPrix(this.qtmulti);
        }
        break;
      case "X10":
        this.qtmulti = "X100";
        for (let produit of this.produits) {
          produit.calculPrix(this.qtmulti);
        }
        break;
      case "X100":
        this.qtmulti = "XMAX";
        for (let produit of this.produits) {
          produit.calculPrix(this.qtmulti);
        }
        break;
      case "XMAX":
        this.qtmulti = "X1";
        for (let produit of this.produits) {
          produit.calculPrix(this.qtmulti);
        }
        break;
    }
  }



  fshowManagers() {
    this.showManagers = true;
  }
  hireManager(manager: Pallier) {
    if (this.world.products.product[manager.idcible - 1].managerUnlocked == false ) {
      if (this.world.money >= manager.seuil && this.world.products.product[manager.idcible - 1].quantite > 0) {
        this.world.money = this.world.money - manager.seuil;
        manager.unlocked = true;
        this.world.products.product[manager.idcible - 1].managerUnlocked = true;
        this.popMessage("Félicitation, vous avez engagé un nouveau manager : "+ manager.name)
        this.service.putManager(manager);
      }
    }

  }
  popMessage(message : string) : void {
    this.snackBar.open(message, "", { duration : 2000 })
    }

  badgeUpgrades() {
    this.badgeManagers = 0;
    for (let manager of this.world.managers.pallier) {
      if (manager.seuil <= this.world.money && !manager.unlocked) {
        this.badgeManagers += 1;
      }
    }
  }
   
}
