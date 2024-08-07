import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {State} from "../../store/models/state.model";
import {StoreManagerComponent} from "../store-manager/store-manager.component";
import {MatSidenav} from "@angular/material/sidenav";
import {Router} from "@angular/router";
import {MENU_ITEMS} from "../../utils/constants/menu/constants";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent extends StoreManagerComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') public sidenav?: MatSidenav;

  menuItems = MENU_ITEMS;

  opened: boolean = true;
  pageTitle?: string;
  subscriptions: Subscription[] = [];
  constructor(protected override store: Store<State>, private router: Router, private cd: ChangeDetectorRef) {
    super(store);
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store.select(store => store.pageTitle).subscribe(title => this.pageTitle = title)
    );
    this.cd.detectChanges();
  }

  openPage(path: string, title: string): void {
    this.setPageTitle(title);
    this.router.navigate([path]);
    this.cd.detectChanges();
  }

  isDetails(): boolean {
    return this.router.url.includes('details')
  }

  goBack(): void {
    if (this.router.url.includes('users')) {
      this.router.navigateByUrl('/users/list');
    }
  }

  isActiveItem(path: string): boolean {
    let moduleName: string = path.split('/')[0];
    return this.router.url.includes(moduleName);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
