class GenerateAnonymous {
  constructor(username, _id) {
    this._id = _id;
    this.username = username;
  }
  generate() {
    return {
      _id: this._id,
      username: this.username,
    };
  }
}

export {GenerateAnonymous};
