import store from '../../store/index.js'

function fillToplist(rating,firstName) {
    return {rating, firstName};
}

  export default function getHotList() {
    const state = store.getState();
    let hottestList = []

    state.topactors.topactors.map(actor => {
        hottestList.push(fillToplist(actor.rating, actor.firstName))
        return null //Needs to return something
    })
    return hottestList
  }

export const hottestList = 3;
