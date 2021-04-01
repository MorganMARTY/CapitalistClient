import { Component } from '@angular/core';
import { RestserviceService } from './restservice.service';
import { World, Product, Pallier } from './world';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CapitalistClient';
  world: World = new World();
  server: string;
  p:Product = new Product();
  //qtmulti = ["x1", "x10", "x100", "max"]; //J'ai ajouté ça 
  qtmulti : string =""; //test Bon ça marche comme ça mais je trouve ça bizarre de dire nul part que qtmulit ça peut prendre les valeurs 1 10 100 et max 
  constructor(private service: RestserviceService) {
    this.server = service.getServer();
    service.getWorld().then(
    world => {
    this.world = world;
    });
    }
   onProductionDone(p : Product){
      this.world.money=this.world.money + p.revenu;
      console.log(this.world.money);
    }

    multiplicateur(){

    }

  
}
