import { Component, computed, effect, inject, signal, WritableSignal } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { TranslateKeys } from "../../../services/i18nHelper";
import { DataModelService } from "../../../services/dataModel.service";

@Component({
  selector: "app-endround-new",
  imports: [TranslatePipe],
  templateUrl: "./endround-banner.component.html",
  styleUrl: "./endround-banner.component.css",
})
export class EndroundBannerComponent {
  dataModel = inject(DataModelService);

  hide = true;
  showAnimation = false;
  showRevealSquares = false;
  showReverseSquares = false;
  clipClosed = false;
  clipClosing = false;
  preload = true;

  lastInRoundNumber = -1;
  lastOutRoundNumber = -1;

  TranslateKeys = TranslateKeys;

  roundWonType: WritableSignal<TranslateKeys> = signal(TranslateKeys.Endround_RoundWin);

  private calculateRoundWonType(): TranslateKeys {
    const wonTeam = this.dataModel.match().teams[this.teamWon()];
    const lostTeam = this.dataModel.match().teams[this.teamWon() === 0 ? 1 : 0];
    let aliveCount = 0;

    let ace = false;
    let clutch = false;
    let flawless = true;
    let teamAce = true;
    // Todo: implement Thrifty round ceremonies when data gets available by Overwolf
    const thrifty = false;

    lostTeam.players.forEach((player) => {
      if (player.isAlive) flawless = false;
    });

    for (const player of wonTeam.players) {
      if (new Set(player.killedPlayerNames).size >= 5) {
        ace = true;
        break;
      }
      if (player.isAlive) aliveCount++;
      if (player.deathsThisRound >= 1) flawless = false;
      if (!(player.killsThisRound >= 1)) teamAce = false;
    }
    if (aliveCount == 1) clutch = true;

    if (ace) return TranslateKeys.Endround_RoundAce;
    else if (clutch) return TranslateKeys.Endround_RoundClutch;
    else if (teamAce) return TranslateKeys.Endround_RoundTeamAce;
    else if (flawless) return TranslateKeys.Endround_RoundFlawless;
    else if (thrifty) return TranslateKeys.Endround_RoundThrifty;
    else return TranslateKeys.Endround_RoundWin;
  }

  tournamentBackgroundUrl = computed(() => {
    const backdrop = this.dataModel.tournamentInfo().backdropUrl;
    if (backdrop && backdrop !== "") return backdrop;
    else return "assets/misc/backdrop.png";
  });

  tournamentIconUrl = computed(() => {
    const logo = this.dataModel.tournamentInfo().logoUrl;
    if (logo && logo !== "") return logo;
    else return "assets/misc/logo.webp";
  });

  eventLogo = computed(() => {
    const logo = this.dataModel.tournamentInfo().logoUrl;
    return logo && logo !== "" ? logo : null;
  });

  eventName = computed(() => {
    const name = this.dataModel.tournamentInfo().name;
    return name && name !== "" ? name : "";
  });

  teamWon = computed(() => {
    if (this.dataModel.match().attackersWon) {
      return this.dataModel.teams()[0].isAttacking ? 0 : 1;
    } else {
      return this.dataModel.teams()[0].isAttacking ? 1 : 0;
    }
  });

  leftWon = computed(() => {
    return this.teamWon() === 0;
  });

  readonly waitingBackgroundClass = computed(() => {
    const test = `gradient-head-to-head-${this.dataModel.teams()[0].isAttacking ? "attacker" : "defender"}`;
    return test;
  });

  readonly winningTeamBackgroundClass = computed(() => {
    return `gradient-${this.leftWon() ? "left" : "right"}-${this.dataModel.match().attackersWon ? "attacker" : "defender"}`;
  });

  teamWonSide = computed(() => {
    return this.dataModel.match().attackersWon ? "ATK" : "DEF";
  });

  teamWonLogoUrl = computed(() => {
    const winningTeamIndex = this.teamWon();
    return this.dataModel.teams()[winningTeamIndex]?.teamUrl || "assets/misc/logo.webp";
  });

  teamWonTricode = computed(() => {
    const winningTeamIndex = this.teamWon();
    return this.dataModel.teams()[winningTeamIndex]?.teamTricode || "";
  });

  onImageLoad() {
    this.preload = false;
  }

  ref = effect(() => {
    const roundPhase = this.dataModel.match().roundPhase;
    const roundNumber = this.dataModel.match().roundNumber;

    if (roundPhase === "end") {
      if (roundNumber === this.lastInRoundNumber) return;
      this.lastInRoundNumber = roundNumber;

      this.hide = false;

      // Prepare reveal by collapsing banner clip and resetting squares
      this.showAnimation = false;
      this.showRevealSquares = false;
      this.showReverseSquares = false;
      this.clipClosed = true;
      this.clipClosing = false;

      // Delay animation start until layout & paint settle
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTimeout(() => {
              this.roundWonType.set(this.calculateRoundWonType());

              this.showAnimation = true;
              this.showRevealSquares = true;

              // After initial animations complete (550ms reveal-text/background completes)
              // Wait 5.66 seconds, then trigger reverse animation
              setTimeout(() => {
                this.clipClosing = true;
                this.showReverseSquares = true;

                // Hide component after reverse animation completes (500ms)
                setTimeout(() => {
                  this.hide = true;
                  this.showAnimation = false;
                  this.showRevealSquares = false;
                  this.showReverseSquares = false;
                  this.clipClosed = false;
                  this.clipClosing = false;
                }, 260);
              }, 550 + 5660); // 550ms (reveal complete) + 5660ms delay
            }, 200);
          });
        });
      });
    } else if (roundPhase === "shopping") {
      if (roundNumber === this.lastOutRoundNumber) return;
      this.lastOutRoundNumber = roundNumber;

      setTimeout(() => {
        this.hide = true;
      }, 3000); // Show for 3 seconds before hiding
    }
  });
}
