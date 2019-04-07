import Vue from 'vue';
import {
  library
} from '@fortawesome/fontawesome-svg-core';
import {
  faTachometerAlt,
  faChartBar,
  faFileArchive,
  faLayerGroup,
  faGripHorizontal,
  faChalkboardTeacher,
  faCogs,
  faTasks,
  faSlidersH,
  faUser,
  faUnlock,
  faIndent,
  faOutdent,
  faStarOfLife
} from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome';


library.add(faUser, faUnlock, faIndent, faOutdent, faTachometerAlt, faChartBar, faFileArchive, faLayerGroup, faGripHorizontal, faChalkboardTeacher, faCogs, faTasks, faSlidersH, faStarOfLife);
Vue.component('font-awesome-icon', FontAwesomeIcon);