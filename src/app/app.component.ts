import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Gtag } from '@chakray/utils/gtag';
import { Head } from '@chakray/utils';

const mod = 'chakray/utils';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'demoUtils';
  data = { mod,
    synopsis: 'Collection of common typescript libs',
    setup: { title: '', content: '' }
  };
  constructor(
    private head: Head,
    private gtag: Gtag,
    private ti: Title,
    private http: HttpClient) {
    head.canonical();
    ti.setTitle(this.data.mod);
    const url = `https://raw.githubusercontent.com/${mod}/master/notes/setup.md`;
    http.get(url, { responseType: 'text' }).subscribe(d => {
      const [title, ...content] = d.split('\n');
      const o = { title: title.split(' ')[1], content: content.join('\n') };
      Object.assign(this.data.setup, o);
    });
  }
}
