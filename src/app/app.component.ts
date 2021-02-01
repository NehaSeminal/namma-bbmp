import { Component } from '@angular/core';

import {SwPush} from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Demo-App';

  selectedFile = null;


  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  showPosition(position) {
    console.log(position.coords.latitude,position.coords.longitude)
   
  }

  onFileSelected(event)
  {
    this.selectedFile = event.target.files[0];
  }

  onUpload()
  {
    console.log(this.selectedFile); // You can use FormData upload to backend server
    
 
  }

  onImageSelected(event)
  {
    this.CaptureSelected();
  }

  

  private CaptureSelected(): Promise<void> {
    alert("test");
    return new Promise<void>(async (resolve, reject) => {
        const filePicker = document.querySelector('input');

        if (!filePicker || !filePicker.files 
            || filePicker.files.length <= 0) {
            reject('No file selected.');
            return;
        }
        const myFile = filePicker.files[0];
        console.log(myFile);

        const myBase64File = await this.convert(myFile);
        console.log(`Your base64 image is ${myBase64File}`);

        resolve();
    });
}
private convert(myFile: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
      const fileReader = new FileReader();
      if (fileReader && myFile) {
          fileReader.readAsDataURL(myFile);
          fileReader.onload = () => {
              const blob = new Blob([new Uint8Array(
                         fileReader.result as ArrayBuffer)]);
              const blobURL = URL.createObjectURL(blob);
              resolve(blobURL);
          };

          fileReader.onerror = (error) => {
              reject(error);
          };
      } else {
          reject('No file provided');
      }
  });
}

url;
format;
onSelectFile(event) {
  const file = event.target.files && event.target.files[0];
  if (file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    if(file.type.indexOf('image')> -1){
      this.format = 'image';
    } else if(file.type.indexOf('video')> -1){
      this.format = 'video';
    }
    reader.onload = (event) => {
      this.url = (<FileReader>event.target).result;
    }
  }
}

items = [
  {id: 1, name: 'Python'},
  {id: 2, name: 'Node Js'},
  {id: 3, name: 'Java'},
  {id: 4, name: 'PHP', disabled: true},
  {id: 5, name: 'Django'},
  {id: 6, name: 'Angular'},
  {id: 7, name: 'Vue'},
  {id: 8, name: 'ReactJs'},
];
selected = [
  
  {id: 2, name: 'Node Js'},
  {id: 8, name: 'ReactJs'}
];

constructor(public swPush: SwPush,
 
) {  }
  
}
