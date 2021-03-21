import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Country } from './country';
import { ExportService } from '../services/export.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css'],
})
export class MainViewComponent implements OnInit {
  countries: Country[] = [];
  private httpClient: HttpClient;
  currentPage: number = 0;
  currentIndex: number = 0;

  currentCountries: any[] = [];

  totalPages: Number = 0;
  totalItems: number = 0;

  @ViewChild('countryTable') countryTable: ElementRef | undefined;

  constructor(
    private _httpClient: HttpClient,
    private exportService: ExportService
  ) {
    this.httpClient = _httpClient;
  }

  ngOnInit(): void {
    this.httpClient.get(`${environment.baseUrl}all`).subscribe((data) => {
      this.countries = data as Country[];
      this.totalItems = this.countries.length;
      this.currentIndex = 10;
      this.currentPage = 1;
      this.currentCountries = this.countries.slice(0, this.currentIndex);
      this.totalPages = Math.trunc(this.countries.length / 10);
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
    const searchRes = this.countries.filter((item) =>
      item.name.toLowerCase().toString().includes(e.target.value.toLowerCase())
    );

    this.totalItems = searchRes.length;
    this.currentIndex = 10;
    this.currentPage = 1;
    this.currentCountries = searchRes.slice(0, this.currentIndex);
    this.totalPages = Math.trunc(searchRes.length / 10);
  }

  /**
   * Function prepares data to pass to export service to create excel from Table DOM reference
   *
   */
  exportElmToExcel(): void {
    if (this.countryTable)
      this.exportService.exportTableElmToExcel(
        this.countryTable,
        'countries-xlsx'
      );
  }
  exportElmToCSV(): void {
    if (this.countryTable)
      this.exportService.exportTableElmToExcel(
        this.countryTable,
        'countries-csv',
        '.csv'
      );
  }
  exportElmToXML(): void {
    if (this.countryTable)
      this.exportService.exportTableElmToExcel(
        this.countryTable,
        'countries-xml',
        '.xml'
      );
  }
}
