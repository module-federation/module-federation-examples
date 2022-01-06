import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'host';
  public arr = ['one', 'two', 'three'];

  constructor(private readonly httpClient: HttpClient) {}

  public addValue(value: string) {
    if (value && value.length > 0) {
      this.arr.push(value);
    }
  }

  public ngOnInit(): void {}
}
