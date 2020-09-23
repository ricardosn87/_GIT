import { Component, OnInit } from '@angular/core';
import { Subject, ReplaySubject, AsyncSubject, BehaviorSubject } from 'rxjs';
import { GenRandomDataService } from '../gen-random-data.service';
import { DataModel } from '../datamodel';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  subject: Subject<DataModel>;
  replaySubject: ReplaySubject<DataModel>;
  asyncSubject: AsyncSubject<DataModel>;
  behaviorSubject: BehaviorSubject<DataModel>;

  constructor(private dataService: GenRandomDataService) { }



  ngOnInit() {
    this.subject= new Subject<DataModel>();
    this.replaySubject= new ReplaySubject<DataModel>();
    this.asyncSubject= new AsyncSubject<DataModel>();
    this.behaviorSubject= new BehaviorSubject<DataModel>({ timestamp: 0, data: 0});
  
    this.dataService.dataObservable.subscribe(this.subject);
    this.dataService.dataObservable.subscribe(this.replaySubject);
    this.dataService.dataObservable.subscribe(this.asyncSubject);
    this.dataService.dataObservable.subscribe(this.behaviorSubject);

  }

  connect() {
    this.dataService.dataObservable.connect();
  }

}