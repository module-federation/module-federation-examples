import {
    Component, ComponentFactoryResolver, Inject, Injector, OnInit, ViewChild, ViewContainerRef
} from '@angular/core';
import { ClientWeatherCityComponent } from '../client-weather-city/client-weather-city.component';

@Component({
    selector:    'app-client-weather-home',
    templateUrl: './client-weather-home.component.html',
    styleUrls:   ['./client-weather-home.component.scss']
})
export class ClientWeatherHomeComponent implements OnInit {
    
    @ViewChild('container', { read: ViewContainerRef, static: true })
    viewContainer: ViewContainerRef;
    
    public cities = ['Prague', 'Saint-Petersburg'];
    
    constructor(@Inject(Injector) private readonly injector,
                @Inject(ComponentFactoryResolver) private readonly componentFactoryResolver) {
    }
    
    public ngOnInit(): void {
    }
    
    public async onClickCity(city: string) {
        import('../client-weather-city/client-weather-city.component')
            .then(module => {
                console.log('Lazy component loaded');
    
                this.viewContainer.clear();
                const factory = this.componentFactoryResolver.resolveComponentFactory(module.ClientWeatherCityComponent);
                const componentInstance = this.viewContainer.createComponent(factory, null, this.injector).instance;
                (componentInstance as any).city = city;
            });
    }
    
}
