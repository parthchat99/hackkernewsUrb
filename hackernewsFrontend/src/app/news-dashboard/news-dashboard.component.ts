import { Component, OnInit } from '@angular/core';
import { NewsDjangoService } from '../news-django.service';

@Component({
  selector: 'app-news-dashboard',
  templateUrl: './news-dashboard.component.html',
  styleUrls: ['./news-dashboard.component.css']
})
export class NewsDashboardComponent implements OnInit {

  constructor(private newsDjangoService: NewsDjangoService) { }

  ngOnInit() {
    this.newsApi();
  }

  newsApi(){
    this.newsDjangoService.getNews().subscribe(res => {
      console.log("res",res);
    });
  }

}
