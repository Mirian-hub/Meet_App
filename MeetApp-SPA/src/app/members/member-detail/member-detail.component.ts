import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertService } from 'src/app/_services/alert.service';
import { ActivatedRoute } from '@angular/router';
import {MatTabGroup} from '@angular/material/tabs';
import { TabHeadingDirective } from 'ngx-bootstrap/tabs';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { publishReplay } from 'rxjs/operators';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
 user: User;
 galleryOptions: NgxGalleryOptions[];
 galleryImages: NgxGalleryImage[];
  constructor(private userService: UserService, private alert: AlertService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(
      data => this.user = data['user']
    );

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
    this.galleryImages = this.getImages();
  } 
  getImages () {
    const imageUrls =[];
    for (const photo of this.user.photos){
       imageUrls.push ({
          small: photo.url,
          medium: photo.url,
          big: photo.url,
          description: photo.description,
       });
     }
     return imageUrls;
  }
}
