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
  
}
