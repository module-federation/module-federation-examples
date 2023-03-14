import {
  Component,
  ComponentFactoryResolver,
  Inject,
  Injector,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'app-client-cities-home',
  templateUrl: './client-cities-home.component.html',
  styleUrls: ['./client-cities-home.component.scss'],
})
export class ClientCitiesHomeComponent implements OnInit {
  @ViewChild('container', { read: ViewContainerRef, static: true })
  viewContainer: ViewContainerRef;

  public cities = ['Prague', 'Saint-Petersburg'];
  public currentCity = null;

  constructor(
    @Inject(Injector) private readonly injector,
    @Inject(ComponentFactoryResolver) private readonly componentFactoryResolver,
  ) {}

  public ngOnInit(): void {}

  public async onClickCity(city: string) {
    import('../client-city/client-city.component').then(module => {
      this.currentCity = city;
      this.viewContainer.clear();
      const factory = this.componentFactoryResolver.resolveComponentFactory(
        module.ClientCityComponent,
      );
      const componentInstance = this.viewContainer.createComponent(
        factory,
        0,
        this.injector,
        null,
      ).instance;
      (componentInstance as any).city = city;
    });
  }
}
