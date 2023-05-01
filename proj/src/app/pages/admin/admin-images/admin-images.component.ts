import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { lastValueFrom } from 'rxjs';
import { from } from 'rxjs';



interface Image {
  url: string;
  path: string;
}

@Component({
  selector: 'app-admin-images',
  templateUrl: './admin-images.component.html',
  styleUrls: ['./admin-images.component.css']
})
export class AdminImagesComponent {
  images: Image[] = [];
  filteredImages: Image[] = [];
  currentCategory: string;
  currentSubcategory: string;
  imagesLoaded: boolean = false;
  loading: boolean = false;

  constructor(private storage: AngularFireStorage) {}

  async ngOnInit() {
    await this.getImages();
    this.imagesLoaded = true;
  }

  async getImages() {
    try {
      const imagesRef = this.storage.ref('');
      const directoryList = await lastValueFrom(from(imagesRef.listAll()));
      for (const dir of directoryList.prefixes) {
        await this.addImagesFromDirectory(dir);
        const subdirectoryList = await lastValueFrom(from(dir.listAll()));
        for (const subdir of subdirectoryList.prefixes) {
          await this.addImagesFromDirectory(subdir);
        }
      }
      this.loading = false;
    } catch (error) {
      console.error('Error retrieving images:', error);
      this.loading = false;
    }
  }
  

  async addImagesFromDirectory(directory: any) {
    const imagesRef = this.storage.ref(directory.fullPath);
    try {
      const imagesList = await imagesRef.listAll().toPromise();
      for (const imageRef of imagesList.items) {
        const metadata = await imageRef.getMetadata();
        if (metadata.contentType.startsWith('image/jpeg') || metadata.contentType.startsWith('image/png')) {
          const imageUrl = await imageRef.getDownloadURL();
          const image = { url: imageUrl, path: imageRef.fullPath };
          this.images.push(image);
          if (this.currentCategory === directory.parent?.name && directory.name === this.currentSubcategory) {
            this.filteredImages.push(image);
          }
        }
      }
    } catch (error) {
      console.error('Error retrieving images:', error);
    }
  }

  showCategory(category: string) {
    this.currentCategory = category;
    this.filteredImages = [];
    for (const image of this.images) {
      if (image.path.startsWith(`/${category}/`)) {
        this.filteredImages.push(image);
      }
    }
  }

  async showSubcategory(subcategory: string) {
    this.loading = true;
    this.currentSubcategory = subcategory;
    this.filteredImages = [];
    for (const image of this.images) {
      const category = this.currentCategory?.toLowerCase();
      const subcategory = this.currentSubcategory?.toLowerCase();
      const path = image.path.toLowerCase();
      if (path.startsWith(`/${category}/${subcategory}/`)) {
        this.filteredImages.push(image);
      }
    }
    await this.addImagesFromDirectory(this.storage.ref(`${this.currentCategory}/${this.currentSubcategory}`));
  }
}  
