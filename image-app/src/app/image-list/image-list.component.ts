import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ImageService } from '../image.service';
import { Image } from '../image';
import { ImageItemComponent } from '../image-item/image-item.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { State as ImagesState, getAllImages } from '../../redux/reducers/images.reducer';
import * as imageActions from '../../redux/actions/image.actions';

import { GlobalState } from '../../redux/GlobalState';

@Component({
  selector: 'image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageListComponent implements OnInit {
  images$: Observable<Image[]>;

  constructor(private store: Store<GlobalState>, private modalService: NgbModal) { }

  ngOnInit() {
    this.images$ = this.store.select((x) => x.imagesTable.images);
  }

  refresh() {
    this.store.dispatch(new imageActions.LoadImagesAction());
  }

  openModal() {
    this.modalService.open(ImageUploadComponent, { size: 'lg' });
  }
}
