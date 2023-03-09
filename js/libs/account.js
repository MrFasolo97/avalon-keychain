class Account {
  constructor(obj) {
    this.account = obj || {};
    this.vp = -1;
    this.dtc = -1;
    this.bw = -1;
    this.info = {};
    this.lastVPUpdateTS = 0;
    this.lastBWUpdateTS = 0;
  }
  async init() {
    await this.updateUserData();
    this.props = new GlobalProps();
  }
  saveAccountInfo(err, info) {
    if(err == null) {
      this.info = info;
    } else {
      console.error(err);
    }
  }
  async updateUserData() {
    await javalon.getAccount(this.account.name, (err, res) => {
      res["vp"] = res.vt.v
      res["bw"] = res.bw.v
      this.saveAccountInfo(err, res);
    });
  }
  getObj() {
    return this.account;
  }
  getName() {
    return this.account.name;
  }
  getKeys() {
    return this.account.keys;
  }
  getKey(key) {
    return this.account.keys[key];
  }
  hasKey(key) {
    return this.account.keys.hasOwnProperty(key);
  }
  setKey(key, val) {
    this.account.keys[key] = val;
  }
  deleteKey(key) {
    delete this.account.keys[key];
    delete this.account.keys[`${key}Pubkey`];
  }
  async getAccountInfos() {
    return this.info;
  }
  async getLeaderVotes() {
    if(typeof this.info.approves == 'undefined') {
      await this.updateUserData();
    }
    return this.info.approves;
  }
  async getAccountInfo(key) {
    const value = await this.info[key];
    return value;
  }
  async getAvailableRewards() {
    this.hf24 = (await this.getAccountInfo("reward_sbd_balance")) === undefined;
    this.reward_hbd =
      (await this.getAccountInfo("reward_sbd_balance")) ||
      (await this.getAccountInfo("reward_hbd_balance"));
    this.reward_vests = await this.getAccountInfo("reward_vesting_balance");
    const reward_hp = (await this.toHP(this.reward_vests)) + " HP";
    this.reward_hive =
      (await this.getAccountInfo("reward_steem_balance")) ||
      (await this.getAccountInfo("reward_hive_balance"));
    let rewardText = chrome.i18n.getMessage("popup_account_redeem") + ":<br>";
    if (getValFromString(reward_hp) != 0) rewardText += reward_hp + " / ";
    if (getValFromString(this.reward_hbd) != 0)
      rewardText += this.reward_hbd + " / ";
    if (getValFromString(this.reward_hive) != 0)
      rewardText += this.reward_hive + " / ";
    rewardText = rewardText.slice(0, -3);
    return [this.reward_hbd, reward_hp, this.reward_hive, rewardText];
  }
  async toHP(vests) {
    return hive.formatter
      .vestToSteem(
        vests,
        await this.props.getProp("total_vesting_shares"),
        (await this.props.getProp("total_vesting_fund_steem")) ||
          (await this.props.getProp("total_vesting_fund_hive"))
      )
      .toFixed(3);
  }

  claimRewards(callback) {
    console.log(this.hf24);

    if (!this.hf24)
      hive.broadcast.claimRewardBalance(
        this.getKey("posting"),
        this.getName(),
        this.reward_hive.replace("HIVE", "STEEM"),
        this.reward_hbd.replace("HBD", "SBD"),
        this.reward_vests,
        callback
      );
    else {
      hive.broadcast.send(
        {
          operations: [
            [
              "claim_reward_balance",
              {
                account: this.getName(),
                reward_hive: this.reward_hive,
                reward_hbd: this.reward_hbd,
                reward_vests: this.reward_vests,
              },
            ],
          ],
          extensions: [],
        },
        { posting: this.getKey("posting") },
        callback
      );
    }
  }

  async getVotingMana() {
    const vm = await getVotingMana(await this.getAccountInfos());
    const full = getTimeBeforeFull(vm * 100);
    return [vm, full];
  }

  async getDTC() {
    return await this.getAccountInfo("balance")/100;
  }

  async getVP() {
    return await this.getAccountInfo("vp");
  }

  async getBW() {
    return await this.getAccountInfo("bw");
  }

  async getVotingDollars(percentage) {
    const vd = await getVotingDollarsPerAccount(
      percentage,
      await this.getAccountInfos(),
      (await this.props.getFund("reward_balance")).replace("HIVE", ""),
      (await this.props.getFund("recent_claims")).replace("HBD", ""),
      await this.props.getHivePrice(),
      await this.props.getProp("vote_power_reserve_rate"),
      false
    );
    return isNaN(vd) ? 0 : vd;
  }

  async getAccountValue() {
    var prices = await this.props.getPrices();
    return (
      (
        "$ " +
          ( parseFloat(prices["USD"]) * parseFloat(await this.getDTC())).toFixed(2)
      ) + "\t  USD"
    );
  }

  async getTransfers() {
    const result = await hive.api.getAccountHistoryAsync(
      this.getName(),
      -1,
      1000,
      "4",
      null
    );
    let transfers = result.filter((tx) => tx[1].op[0] === "transfer");
    transfers = transfers.slice(-10).reverse();
    return transfers;
  }
}
