export const selectedAttsAdjust = function () {
  const atts = _.clone(this.atts)

  if (this.selected) {
    atts.checked = "checked"
  }

  atts.id = atts.id + "_" + this._id
  delete atts['data-schema-key']
  return atts
}
