import { Component, OnInit } from '@angular/core';
import { LoaderService } from './loader.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  loading: boolean = false;
  constructor(private loaderService: LoaderService) {
    this.loaderService.isLoading.subscribe(x => {
      this.loading = x;
    }, err => console.log(err));
  }

  ngOnInit() {
  }

}
