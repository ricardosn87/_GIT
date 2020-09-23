import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { DepartmentService } from './../department.service';
import { Department } from './../department';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  depName: string = ""
  dapartments: Department[] = []
  depEdit: Department = null;
  unsubscribe$: Subject<any> = new Subject();

  constructor(private departmentService: DepartmentService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.departmentService.get()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((deps) => this.dapartments = deps);
  }

  save() {

    if (this.edit) {
      this.departmentService.update({ name: this.depName, _id: this.depEdit._id })
        .subscribe(
          (dep) => { this.notify("Updated!") },
          (err) => { this.notify("Error!" + err) }
        )
    }
    else {
      var department: Department = { name: this.depName }

      this.departmentService.add(department)
        .subscribe(
          (dep) => this.notify("Inserted!"),
          (err) => { this.notify("Error!" + err) }
        )
    }


  }
  cancel() { }
  delete(dep) {
    this.departmentService.del(dep)
      .subscribe(
        (dep) => this.notify("Deleted!"),
        (err) => { this.notify("Error!" + err) }
      )
  }
  edit(dep: Department) {
    this.depName = dep.name
    this.depEdit = dep
  }

  notify(msg: string) {
    this.snackBar.open(msg, "OK", { duration: 3000 })
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
  }

}



