import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  selectedLangInfo: any = {}; //Instead of any use appropiate Model obj
  languages: any = []; //Instead of any use appropiate Model obj
  selectedLang: any = {};
  appConfig: any = { // Default language set to English
    language: "en",
    fontStyle: "",
    fontSize: "",
    color: ""
  }
  colorList: any;//Instead of any use appropiate Model obj
  fontSizeList: any;//Instead of any use appropiate Model obj
  styleList: any;//Instead of any use appropiate Model obj

  constructor(private httpClient: HttpClient) {
    this.languages = this.getActiveLanguages();
    let langBackUp = this.languages;
    this.selectedLang = langBackUp.filter(item => {
      return item.isDefault == true;
    });

  }

  //Using static data as per defined.
  getActiveLanguages() {
    return [
      {
        name: "English",
        sort: "en",
        isDefault: true
      },
      {
        name: "Hindi",
        sort: "hi",
        isDefault: false
      },
      {
        name: "Chinese",
        sort: "ch",
        isDefault: false
      }
    ];
  }
  ngOnInit(): void {
    this.getSelectedLangContent(this.selectedLang[0].sort);

    this.colorList = [
      { value: "red" },
      { value: "green" },
      { value: "blue" }
    ];
    this.fontSizeList = [
      { value: "12" },
      { value: "14" },
      { value: "16" },
      { value: "18" },
      { value: "20" },
      { value: "22" }
    ];
    this.styleList = [
      { value: "bold" },
      { value: "italic" },
      { value: "underline" }
    ];
  }

  getSelectedLangContent(sortName) {
    this.httpClient.get("assets/language-" + sortName + ".json").subscribe(data => {
      this.selectedLangInfo = data;
    });
  }

  onLanguageChange() {
    this.getSelectedLangContent(this.appConfig.language);
  }
}
