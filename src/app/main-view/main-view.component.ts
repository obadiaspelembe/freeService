import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Country } from './country';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css'],
})
export class MainViewComponent implements OnInit {
  countries: Country[] = [];
  private httpClient: HttpClient;
  dtOptions: DataTables.Settings = {};
  currentPage: number = 1;
  currentIndex: number = 10;

  currentCountries: any[] = [];

  totalPages: number = 0;
  totalItems: number = 10;

  constructor(private _httpClient: HttpClient) {
    this.httpClient = _httpClient;
  }

  ngOnInit(): void {
    this.httpClient.get(`${environment.baseUrl}all`).subscribe((data) => {
      this.countries = data as Country[];
      this.totalItems = this.countries.length;
      this.currentCountries = this.countries.slice(0, this.currentIndex);
      this.totalPages = this.countries.length / 10;
    });
  }

  getNext(): void {
    if (this.currentPage < this.countries.length / 10) {
      this.currentCountries = this.countries.slice(
        this.currentIndex,
        this.currentIndex + 10
      );

      this.currentIndex += 10;
      this.currentPage += 1;
    }
  }

  getPrevious(): void {
    if (this.currentIndex >= 20) {
      this.currentCountries = this.countries.slice(
        this.currentIndex - 20,
        this.currentIndex - 10
      );
      this.currentIndex -= 10;
      this.currentPage -= 1;
    }
  }

  search(e: any): void {
    this.currentCountries = this.countries.filter((item) =>
      item.name.toLowerCase().toString().includes(e.target.value)
    );
  }
}