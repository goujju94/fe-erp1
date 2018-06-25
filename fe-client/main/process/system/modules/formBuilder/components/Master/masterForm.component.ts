import { Component, ViewEncapsulation, OnInit, DoCheck} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { FormMasterService } from '@L3Process/system/modules/formBuilder/services/formMaster.service';
import { clearOverrides } from '@angular/core/src/view';
import { builderFieldCompInterface } from './masterForm.interface';


@Component(
{
  selector: 'form-master',
  templateUrl: './masterForm.component.html',
  styleUrls: ['./masterForm.component.css'],
  encapsulation: ViewEncapsulation.None,

}
)

export class FeMasterFormComponent implements OnInit,DoCheck{

  Json = {id: 'FRM000001', name: 'form',code:'FRM000001',label:'My Form',components: []};


  componentData= <builderFieldCompInterface>{};






  modalRef: NgbModalRef;
  tooltipBoolean = false;
  currentEvent;

  constructor(private modalService: NgbModal, private masterFormService: FormMasterService) {

  }

  ngDoCheck() {
  if(this.componentData.tooltip){

    this.tooltipBoolean=true;

   }
   else
   {
     this.tooltipBoolean=false;

   }
  }

  ngOnInit() {
    this.modalRef = this.masterFormService.getModalRef();
    this.currentEvent=this.masterFormService.getCurrentEvent();
  }

  close() {
    this.modalRef.close();
  }

  onSubmit(form){
    form.name=this.currentEvent.dragData.name;
    form.type=this.currentEvent.dragData.type;
    this.Json.components.push(form);

    JSON.stringify(this.Json);

    this.modalRef.close();



  }
}
