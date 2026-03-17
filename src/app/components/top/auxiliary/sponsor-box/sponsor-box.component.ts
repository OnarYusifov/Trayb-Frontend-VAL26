import { Component, inject, OnDestroy, signal, effect } from "@angular/core";
import { DataModelService } from "../../../../services/dataModel.service";

@Component({
  selector: "app-sponsor-box",
  imports: [],
  templateUrl: "./sponsor-box.component.html",
  styleUrl: "./sponsor-box.component.css",
})
export class SponsorBoxComponent implements OnDestroy {
  dataModel = inject(DataModelService);

  currentIndex = signal(0);
  private intervalId?: number;

  constructor() {
    effect(() => {
      const sponsorInfo = this.dataModel.sponsorInfo();

      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = undefined;
      }
      this.currentIndex.set(0);

      if (sponsorInfo.enabled && sponsorInfo.sponsors.length > 1) {
        const duration =
          sponsorInfo.duration > 100 ? sponsorInfo.duration : sponsorInfo.duration * 1000;
        this.intervalId = window.setInterval(() => {
          this.currentIndex.update((i) => (i + 1) % this.dataModel.sponsorInfo().sponsors.length);
        }, duration);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
