import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NewsDjangoService } from '../news-django.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-news-dashboard',
  templateUrl: './news-dashboard.component.html',
  styleUrls: ['./news-dashboard.component.css']
})
export class NewsDashboardComponent implements OnInit, AfterViewInit {

  // name: Array<any>;
  // title: Array<any>;
  // upvote: Array<any>;
  // url: Array<any>;
  // sentiment: Array<any>;
  data: Array<any>;

  constructor(private newsDjangoService: NewsDjangoService, private route: ActivatedRoute, private _router: Router) {
    this.route.queryParams.subscribe(params => {

      if(params['limit'] && params['offset']) {
        this.newsApi(params['limit'], params['offset']);
        this.postNewsApi(params['limit'], params['offset']);
      }
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let limit = this.route.snapshot.queryParams['limit'] ? this.route.snapshot.queryParams['limit']: 10;
    let offset = this.route.snapshot.queryParams['offset'] ? this.route.snapshot.queryParams['offset']: 0;

    this.newsApi(limit, offset);
  }

  newsApi(l, o) {
    this.newsDjangoService.getNews(l, o).subscribe(res => {
      this._router.navigate([], {queryParams: {limit: l, offset: o}});
      this.data = res["results"].map(element => ({
        name : element['userName'],
        title : element['title'],
        upvote : element['upVote'],
        url : element['url'],
        sentiment : element['sentiment'].join(', ')
      }));
    });
  }

  loadNext(){
    let limit = this.route.snapshot.queryParams['limit'] ? this.route.snapshot.queryParams['limit']: 10;
    let offset = this.route.snapshot.queryParams['offset'] ? this.route.snapshot.queryParams['offset']: 0;

    this.newsApi(limit, ++offset);
    this.postNewsApi(limit, ++offset)
  }

  loadPrevious(){
    let limit = this.route.snapshot.queryParams['limit'] ? this.route.snapshot.queryParams['limit']: 10;
    let offset = this.route.snapshot.queryParams['offset'] ? this.route.snapshot.queryParams['offset']: 0;

    this.newsApi(limit, --offset);
    this.postNewsApi(limit, --offset)
  }

  postNewsApi(l, o) {
    this.newsDjangoService.getApiNews(l, o).subscribe(res => {});
  }

}
