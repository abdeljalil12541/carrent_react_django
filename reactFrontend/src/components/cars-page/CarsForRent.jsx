import { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import axios from 'axios';
import { Tooltip } from 'react-tooltip';
import '../../styles/css/ToolTip.css';
import { FaLongArrowAltUp, FaLongArrowAltDown } from 'react-icons/fa'
import { Link } from 'react-router-dom';




const FEATURE_CONFIGS = {
  bagage: {
    matchTerms: ['bagage', 'bagages'],
    icon: (
      <svg className="border mr-1 py-0.5 px-0.5 rounded hover:border-red-600 duration-300" fill="#818589" height="30px" width="30px" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><g><path d="M79.9,23.4c0-4-3.5-6.5-7.8-6.5c0,0-16.4,0-16.3,0c-4.2,0-7.8,2.5-7.8,6.5v11H32.7v76.5h62.6V34.4H79.9V23.4z M74.2,34.4 H53.7V23.1h20.5V34.4z" /><path d="M7.2,45.8c0,0.2,0,53.3,0,53.3c0,7.4,5.6,11.7,11.4,11.7H27V34.2h-8.4C12.7,34.2,7.2,39.2,7.2,45.8z" /><path d="M109.4,34.2H101v76.6h8.4c5.8,0,11.4-4.3,11.4-11.7c0,0,0-53.1,0-53.3C120.8,39.2,115.3,34.2,109.4,34.2z" /></g></svg>
    ),
    tooltip: "Bagages"
  },
  portes: {
    matchTerms: ['portes', 'porte'],
    icon: (
      <svg className='border mr-1 py-0.5 px-0.5 rounded hover:border-red-600 duration-300' height="30px" width="30px" viewBox="0 0 512 512" id="svg3007" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg" fill="#000000" transform="rotate(90)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <defs id="defs3009"></defs> <g id="layer1" transform="translate(0,-540.36218)"> <g id="g4295"> <path d="" id="path4028" style={{ color: '#000000', fill: '#000000', fillOpacity: 1, fillRule: 'nonzero', stroke: 'none', strokeWidth: 20, marker: 'none', visibility: 'visible', display: 'inline', overflow: 'visible', enableBackground: 'accumulate' }} transform="translate(0,540.36218)"></path> <path d="m 217.13642,686.49653 c -0.0357,6e-4 -0.14981,0.0181 -0.24,0.02 -0.87778,0.0194 -3.99768,0.0945 -5.7,0.48 -1.90342,0.43104 -3.80556,1.01751 -5.48,2.02 -2.50472,1.49965 -4.61679,3.64138 -6.56,5.82 -1.62169,1.81818 -2.86241,3.94371 -4.2,5.98 -0.53772,0.81863 -1.23176,1.58394 -1.52,2.52 -0.0398,0.12911 -0.093,0.24477 -0.12,0.38 -31.25675,0.0882 -62.51305,0.31019 -93.759999,1.02 -18.762206,0.62707 -37.167472,10.05239 -47.439992,25.98 -4.401784,5.13425 -7.214072,11.19834 -8.48,17.76 -7.317976,19.75288 -4.191064,41.28355 -4.86,61.9 -0.621408,16.44047 2.831368,32.97476 10.28,47.6 8.660096,13.64969 21.606544,25.82672 38.159996,28.3 23.190605,4.82131 47.075915,2.08365 70.579995,2.88 11.85404,-0.0263 23.70564,-0.0182 35.56,-0.02 0.0203,0.0847 0.0548,0.15807 0.08,0.24 0.28824,0.93606 0.98228,1.70139 1.52,2.52 1.33759,2.03628 2.57831,4.16185 4.2,5.98 1.94321,2.17863 4.05528,4.32039 6.56,5.82 1.67444,1.00252 3.57658,1.58899 5.48,2.02 1.70232,0.38547 4.82222,0.46069 5.7,0.48 0.39521,0.0811 0.81989,0.0108 1.1,-0.2 0.28011,-0.21079 0.36846,-0.41857 0.44,-0.9 0.0715,-0.48141 -6e-4,-0.68937 -0.32,-1.9 -0.31915,-1.21063 -1.08197,-3.31953 -1.9,-5.24 -0.81803,-1.92046 -2.17583,-4.55649 -3.08,-6.22 -0.57813,-1.06366 -1.04799,-1.86772 -1.5,-2.6 15.42148,0.007 30.83838,0.007 46.26,0.02 0.0542,0.0712 0.11147,0.14771 0.18,0.22 0.35576,0.37523 0.87286,0.87216 1.86,1.22 0.98715,0.34784 1.03685,0.25022 4.04,0.4 3.00315,0.14979 10.61173,0.0969 12.84002,-0.04 2.22829,-0.13693 2.62509,-0.17186 3.72,-0.6 0.88435,-0.3458 1.54445,-0.51239 1.68,-1.18 23.49574,0.006 47.00493,-0.021 70.50003,-0.12 0.86375,0.29284 1.05882,0.21734 3.92,0.36 3.00288,0.14979 10.63168,0.0969 12.85997,-0.04 1.8375,-0.11291 2.43552,-0.16667 3.2,-0.42 19.41229,-0.12141 38.82912,-0.30509 58.24,-0.58 13.57414,0.032 27.06349,-8.42931 31.62003,-21.48 11.63763,-28.70999 11.42835,-60.54084 10.24,-91.04 -1.52,-19.91366 -4.08928,-40.86446 -14.88,-58.06 -9.66841,-13.69542 -28.30093,-14.09957 -43.48006,-14.04 -14.29447,-0.14953 -28.58432,-0.20843 -42.88,-0.24 -0.4857,-0.0644 -1.07834,-0.11966 -2.05997,-0.18 -2.22829,-0.13683 -9.85709,-0.18976 -12.85997,-0.04 -1.97113,0.0983 -2.63309,0.0978 -3.16006,0.18 -18.30637,-0.005 -36.61344,0.0394 -54.91994,0.04 -5.43936,0.0294 -10.88083,0.0422 -16.32006,0.06 -0.11418,-0.70563 -0.79635,-0.86663 -1.69997,-1.22 -1.09491,-0.42816 -1.49171,-0.4631 -3.72,-0.6 -2.22829,-0.13689 -9.83687,-0.18982 -12.84002,-0.04 -3.00315,0.14976 -3.05285,0.0522 -4.04,0.4 -0.98714,0.34784 -1.50424,0.84477 -1.86,1.22 -0.0889,0.0938 -0.17716,0.18699 -0.24,0.28 -15.42082,0.0197 -30.8389,0.0388 -46.26,0.06 0.47103,-0.75771 0.95512,-1.58712 1.56,-2.7 0.90417,-1.66355 2.26197,-4.29949 3.08,-6.22 0.81803,-1.92045 1.58085,-4.02937 1.9,-5.24 0.3194,-1.21069 0.39154,-1.41853 0.32,-1.9 -0.0715,-0.48141 -0.15989,-0.68925 -0.44,-0.9 -0.19148,-0.14425 -0.45165,-0.21013 -0.72,-0.22 -0.0456,-0.002 -0.0939,-0.002 -0.14,0 z m 52.58,17.08 c 0.56925,-0.006 1.21616,-0.006 1.84,0.02 -0.88726,0.002 -1.77272,-0.002 -2.66,0 0.28238,-0.011 0.57178,-0.0172 0.82,-0.02 z m 161.62002,7.32 c 3.98362,-0.10006 8.47507,0.49707 10.90003,1.74 5.93658,3.04302 9.49709,7.73067 10.88,14.34 0.45127,2.15734 1.52666,5.29191 2.37997,6.98 2.53837,5.02162 4.8743,12.28169 4.66003,14.46 l -0.20006,2.02 -1.97997,-1.86 c -1.08813,-1.02017 -2.95002,-3.95264 -4.12,-6.52 -6.77248,-14.86119 -15.81574,-23.51737 -29.6,-28.36 -1.19942,-0.42138 -1.19046,-0.46785 -0.0602,-1.3 1.2583,-0.92616 4.04166,-1.42217 7.14003,-1.5 z m -214.34002,1.26 c 1.28877,-0.008 2.76232,-0.003 4.4,0 10.91785,0.021 29.10184,0.26157 48.16,0.66 l 13.59999,0.28 5.30003,8.32 c 2.91123,4.56694 5.37677,8.74014 5.48,9.28 0.18515,0.96863 0.13594,0.96669 -4.10003,0.9 -2.3609,-0.0372 -8.51539,-0.213 -13.65997,-0.4 -14.53322,-0.52824 -36.94353,-2.85729 -51.10002,-5.3 l -5.66,-0.96 -1.82,-2.84 c -1.00208,-1.55534 -2.8663,-4.27453 -4.14,-6.06 -1.27368,-1.78547 -2.38732,-3.43261 -2.48,-3.66 -0.0463,-0.11365 2.15371,-0.19541 6.02,-0.22 z m -127.579995,0.46 c 1.03944,5e-5 2.21927,-0.006 3.559996,0 14.445959,0.0595 17.025159,1.16889 11.499999,4.9 -3.1921,2.15562 -23.743005,14.63843 -32.059991,19.48 -7.071624,4.11661 -9.857224,6.48779 -13.02,11.08 -1.273056,1.84842 -3.206832,3.77177 -4.32,4.3 -2.067376,0.98104 -5.291528,1.26847 -6.02,0.54 -0.2256,-0.2256 -0.42,-2.03475 -0.42,-4.02 0,-3.85553 1.171272,-6.73686 5.4,-13.4 3.47964,-5.48282 10.249448,-13.16521 14.26,-16.18 2.051664,-1.54227 6.009864,-3.7001 8.8,-4.78 4.407076,-1.70571 5.043876,-1.92031 12.319996,-1.92 z m 217.499985,0.82 c 1.64902,-0.004 4.24409,0.059 8.26003,0.16 33.70726,0.84835 55.6313,1.59333 55.89997,1.88 0.45107,0.48013 1.70003,8.21307 1.70003,10.54 0,3.62553 0.2832,3.52308 -12.21997,4.18 -8.3664,0.43955 -40.07334,1.42795 -47.62003,1.48 -0.73446,0.005 -1.54112,-1.45207 -4.66003,-8.4 -2.07354,-4.61928 -3.91565,-8.75175 -4.08,-9.18 -0.17735,-0.46263 -0.0282,-0.65358 2.72,-0.66 z m 84.34003,4.84 c 0.72762,-0.0236 1.62912,0.0285 2.77997,0.12 4.51046,0.35861 15.21165,1.87641 15.80006,2.24 1.26336,0.78093 -5.23923,3.08808 -13.2,4.7 -5.92525,1.19971 -6.61395,1.27001 -8.08,0.68 -1.36211,-0.54802 -1.63193,-2.19514 -0.78003,-4.76 0.7241,-2.18021 1.29715,-2.90916 3.48,-2.98 z m -238.72002,3.74 c 1.92495,0 55.0127,11.67285 64.22,14.12 6.20751,1.64986 17.61444,5.50446 25.34,8.56 17.578,6.95228 26.56977,9.32 35.44002,9.32 6.75187,0 7.14182,0.17929 12.68,6.1 l 5.69997,6.1 0,30.24 0,30.26 -5.56,5.94 -5.53997,5.92 -10.76,0.64 c -8.48659,0.49582 -13.21812,1.58867 -22.44002,5.18 -22.9803,8.94935 -37.94438,13.3134 -65.84,19.26 -15.56638,3.31834 -29.53522,6.31725 -31.04,6.66 -2.20387,0.50201 -3.18789,-0.27063 -5.08,-4 -2.90944,-5.73456 -9.30603,-25.69652 -11.14,-34.78 -4.04471,-20.03301 -3.72723,-55.65604 0.64,-73.22 4.07268,-16.37935 11.41631,-36.3 13.38,-36.3 z m 285.20002,6.3 c 3.39469,-0.16631 4.42317,2.7662 8.12,9.7 10.05459,18.8585 13.09901,35.10049 12.16,65 -0.7367,23.45759 -2.7319,32.47286 -10.86003,49 -7.08256,14.40155 -7.26835,14.50003 -17.71994,9.52 -4.73773,-2.25733 -11.80845,-5.30076 -15.70003,-6.76 -3.89158,-1.45924 -7.08,-2.87539 -7.08,-3.14 0,-0.26461 1.92986,-4.29313 4.28,-8.96 7.37645,-14.64765 9.7945,-26.29157 9.72,-46.82 -0.0746,-20.54911 -2.2448,-30.75562 -9.68,-45.52 -2.45971,-4.88434 -4.29261,-9.02499 -4.08,-9.2 0.21267,-0.17501 7.53171,-3.42994 16.25997,-7.24 7.88019,-3.43972 11.93971,-5.45064 14.58003,-5.58 z m -387.220011,110.9 c 0.488216,-0.0427 1.092504,0.0414 1.84,0.22 3.658824,0.87423 4.193248,1.29611 7.28,5.54 3.662152,5.035 5.749016,6.70139 14.84,11.96 13.471746,7.79265 31.589331,19.14478 32.239991,20.2 1.39475,2.26194 -0.26505,2.64016 -12.719999,2.78 -10.283886,0.11546 -12.234546,-0.0221 -15.039996,-1.04 -9.37962,-3.40338 -16.845044,-9.75316 -23.879996,-20.32 -5.177544,-7.77691 -6.403456,-10.62042 -6.42,-14.86 -0.01216,-3.10701 0.395344,-4.35201 1.86,-4.48 z m 409.439981,3.22 0.18003,1.84 c 0.21709,2.13231 -2.36992,10.22075 -4.56,14.22 -0.81773,1.49331 -1.90208,4.67187 -2.4,7.06 -2.11981,10.16655 -9.97318,16.47352 -20.26003,16.3 -2.05351,-0.0346 -4.57319,-0.25391 -5.6,-0.5 -1.02669,-0.24609 -2.40218,-0.75186 -3.05997,-1.12 -1.11949,-0.62647 -1.07507,-0.7076 0.64,-1.4 7.98688,-3.22453 12.3808,-5.8991 16.6,-10.06 5.0361,-4.96646 8.20346,-9.57455 12.29997,-17.94 1.55609,-3.17773 3.56461,-6.37662 4.48,-7.1 l 1.68,-1.3 z m -147.92,18.66 8.72,0.1 c 10.58528,0.11951 31.39923,0.84934 42.66003,1.48 6.70989,0.3758 8.35859,0.59064 8.8,1.16 0.75008,0.96743 0.67104,4.78806 -0.21997,9.44 l -0.76006,3.9 -1.95994,0.3 c -1.89913,0.28723 -24.57369,0.96055 -51.92,1.54 -9.47449,0.20075 -13.39897,0.14826 -13.28,-0.18 0.0927,-0.25608 1.91987,-4.35166 4.05997,-9.1 l 3.89997,-8.64 z m -25.76,0.18 c 4.69472,-0.008 7.74003,0.17931 7.74003,0.62 0,0.57002 -9.58381,16.05708 -10.62003,17.16 -0.51059,0.54346 -11.65154,0.83563 -60.17999,1.56 l -12.7,0.2 1.78,-2.46 c 0.9853,-1.35083 2.97553,-4.28071 4.42,-6.5 1.60182,-2.46103 2.9892,-4.11686 3.54,-4.24 4.92828,-1.1018 23.75501,-3.61132 35.48,-4.74 10.33749,-0.99511 22.71554,-1.58634 30.53999,-1.6 z m 104.58003,5.28 c 1.80902,0.0252 4.37696,0.46624 7.88,1.26 8.77434,1.98822 13.20595,3.94811 10.28,4.56 -2.82042,0.58983 -11.11066,1.60575 -15.22003,1.86 l -4.41997,0.26 -0.88,-1.44 c -0.48224,-0.79289 -1.00243,-2.20768 -1.16,-3.14 -0.39418,-2.3334 0.50496,-3.40202 3.52,-3.36 z" id="path4400-3-2" style={{ color: '#000000', fill: '#818589', fillOpacity: 1, fillRule: 'nonzero', stroke: 'none', strokeWidth: 0.1, marker: 'none', visibility: 'visible', display: 'inline', overflow: 'visible', enableBackground: 'accumulate' }}></path> </g> </g> </g></svg>
    ),
    tooltip: "Portes"
  },
  transmission: {
    matchTerms: ['automatique', 'manuel'],
    icon: (
      <svg className='border mr-1 py-0.5 px-0.5 rounded hover:border-red-600 duration-300' height="30px" width="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 12H19.5C20.3284 12 21 12.6716 21 13.5V16" stroke="#818589" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <circle cx="12" cy="3" r="2" stroke="#818589" stroke-width="1.5"></circle> <circle cx="3" cy="3" r="2" stroke="#818589" stroke-width="1.5"></circle> <circle cx="12" cy="21" r="2" stroke="#818589" stroke-width="1.5"></circle> <circle cx="21" cy="21" r="2" stroke="#818589" stroke-width="1.5"></circle> <circle cx="3" cy="21" r="2" stroke="#818589" stroke-width="1.5"></circle> <path d="M3 8V12V14.25V16" stroke="#818589" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 7.5V12V16" stroke="#818589" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
    ),
    tooltip: "Transmission"
  },
  fuel: {
    matchTerms: ['petrol', 'diesel', 'hybrid'],
    icon: (
      <svg className='border mr-1 py-0.5 px-0.5 rounded hover:border-red-600 duration-300' fill="#818589" height="30px" width="30px"  xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 14 14" id="svg2"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <metadata id="metadata8"> <rdf:rdf> <cc:work rdf:about=""> <dc:format>image/svg+xml</dc:format> <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"></dc:type> <dc:title></dc:title> </cc:work> </rdf:rdf> </metadata> <defs id="defs6"></defs> <rect width="14" height="14" x="0" y="0" id="canvas" style={{fill:'none', stroke:'none' ,visibility:'hidden'}}></rect> <path d="m 10.78125,0 -0.625,0.71875 1.1875,1.09375 c 0.03621,0.036212 0.0856,0.084693 0.125,0.125 l -0.25,0.28125 C 10.818532,2.6189681 11.105689,3.1369332 11.25,3.28125 L 12,4.03125 12,10 c 0,1 -0.392136,1 -0.5,1 C 11.392136,11 11,11 11,10 L 11,6 C 11,4.7190916 10,4 9,4 L 9,2 C 9,1.4486964 8.575273,1 8,1 L 2,1 C 1.400757,1 1,1.4247267 1,2 l 0,12 8,0 0,-9 c 0,0 1,0 1,1 l 0,4 c 0,2 1.239698,2 1.5,2 0.275652,0 1.5,0 1.5,-2 L 13,3 C 13,2 12.713983,1.7907839 12.375,1.46875 L 10.78125,0 z M 2,3 8,3 8,6 2,6 2,3 z" id="fuel" style={{fill:'#818589', fillOpacity: '1', stroke:'none'}}></path> </g></svg>                    

    ),
    tooltip: "Fuel Type"
  },
  passengers: {
    matchTerms: ['passagers', 'passager'],
    icon: (
      <svg className='border mr-1 py-0.5 px-0.5 rounded hover:border-red-600 duration-300' fill="#818589" height="30px" width="30px"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M13.9 2.999A1.9 1.9 0 1 1 12 1.1a1.9 1.9 0 0 1 1.9 1.899zM13.544 6h-3.088a1.855 1.855 0 0 0-1.8 1.405l-1.662 6.652a.667.667 0 0 0 .14.573.873.873 0 0 0 .665.33.718.718 0 0 0 .653-.445L10 9.1V13l-.922 9.219a.71.71 0 0 0 .707.781h.074a.69.69 0 0 0 .678-.563L12 14.583l1.463 7.854a.69.69 0 0 0 .678.563h.074a.71.71 0 0 0 .707-.781L14 13V9.1l1.548 5.415a.718.718 0 0 0 .653.444.873.873 0 0 0 .665-.329.667.667 0 0 0 .14-.573l-1.662-6.652A1.855 1.855 0 0 0 13.544 6z"></path><path fill="none" d="M0 0h24v24H0z"></path></g></svg>                    
    ),
    tooltip: "Passengers"
  }
};

const FeatureIcon = ({ featureKey, tooltipContent }) => {
  const config = FEATURE_CONFIGS[featureKey];
  const tooltipId = `tooltip-${featureKey}`;

  return (
    <div className="inline-block">
      <Tooltip id={tooltipId} style={{ backgroundColor: '#030712' }} />
      <div data-tooltip-id={tooltipId} data-tooltip-content={tooltipContent || config.tooltip}>
        {config.icon}
      </div>
    </div>
  );
};

const CarFeatures = ({ features }) => {
  const hasFeature = (feature, matchTerms) => {
    return matchTerms.some(term => 
      feature.toLowerCase().includes(term.toLowerCase())
    );
  };

  const extractFeatureValue = (feature, matchTerms) => {
    const matchedTerm = matchTerms.find(term => 
      feature.toLowerCase().includes(term.toLowerCase())
    );
    return feature;
  };

  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(FEATURE_CONFIGS).map(([key, config]) => {
        const matchingFeature = features.find(feature => 
          hasFeature(feature, config.matchTerms)
        );

        if (matchingFeature) {
          return (
            <FeatureIcon
              key={key}
              featureKey={key}
              tooltipContent={extractFeatureValue(matchingFeature, config.matchTerms)}
            />
          );
        }
        return null;
      })}
    </div>
  );
};












const EQUIPEMENT_CONFIGS = {
  controleDuClimat: {
    matchTerms: ['Contrôle du climat', 'Contrôle du climat'],
    icon: (
      <svg className='border mr-1 py-0.5 px-0.5 rounded hover:border-red-600 duration-300' height="30px" width="30px" fill="#818589" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.001 512.001" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M281.12,353.354V42.221C281.12,18.941,262.18,0,238.899,0c-23.282,0-42.221,18.941-42.221,42.221v311.133 c-26.391,15.093-42.646,42.761-42.756,73.36c-0.078,21.959,8.481,42.96,24.097,59.132c15.624,16.179,36.315,25.453,58.26,26.115 c0.886,0.026,1.767,0.04,2.649,0.04c22.227-0.001,43.14-8.461,59.142-23.987c16.642-16.149,25.806-37.809,25.806-60.992 C323.875,396.291,307.619,368.505,281.12,353.354z M286.905,476.506c-13.496,13.095-31.316,20.003-50.142,19.427 c-17.741-0.534-34.507-8.072-47.21-21.226c-12.701-13.152-19.661-30.176-19.597-47.937c0.093-26.181,14.773-49.723,38.31-61.438 c2.724-1.355,4.444-4.136,4.444-7.177V42.221c0-14.44,11.748-26.188,26.188-26.188c14.44,0,26.188,11.748,26.188,26.188v315.935 c0,3.042,1.721,5.821,4.444,7.177c23.632,11.762,38.311,35.4,38.311,61.689C307.842,445.831,300.407,463.405,286.905,476.506z"></path> </g> </g> <g> <g> <path d="M246.915,376.889V93.528c0-4.427-3.589-8.017-8.017-8.017c-4.427,0-8.017,3.589-8.017,8.017v283.361 c-24.2,3.855-42.756,24.866-42.756,50.133c0,27.995,22.777,50.772,50.772,50.772c27.995,0,50.772-22.777,50.772-50.772 C289.671,401.755,271.115,380.744,246.915,376.889z M238.899,461.761c-19.155,0-34.739-15.584-34.739-34.739 c0-19.155,15.584-34.739,34.739-34.739s34.739,15.584,34.739,34.739C273.638,446.177,258.054,461.761,238.899,461.761z"></path> </g> </g> <g> <g> <path d="M350.063,256.534h-42.756c-4.427,0-8.017,3.589-8.017,8.017s3.589,8.017,8.017,8.017h42.756 c4.427,0,8.017-3.589,8.017-8.017S354.492,256.534,350.063,256.534z"></path> </g> </g> <g> <g> <path d="M332.961,213.778h-25.653c-4.427,0-8.017,3.589-8.017,8.017c0,4.427,3.589,8.017,8.017,8.017h25.653 c4.427,0,8.017-3.589,8.017-8.017C340.978,217.368,337.388,213.778,332.961,213.778z"></path> </g> </g> <g> <g> <path d="M350.063,171.023h-42.756c-4.427,0-8.017,3.589-8.017,8.017c0,4.427,3.589,8.017,8.017,8.017h42.756 c4.427,0,8.017-3.589,8.017-8.017C358.08,174.612,354.492,171.023,350.063,171.023z"></path> </g> </g> <g> <g> <path d="M332.961,128.267h-25.653c-4.427,0-8.017,3.589-8.017,8.017c0,4.427,3.589,8.017,8.017,8.017h25.653 c4.427,0,8.017-3.589,8.017-8.017C340.978,131.856,337.388,128.267,332.961,128.267z"></path> </g> </g> <g> <g> <path d="M350.063,85.511h-42.756c-4.427,0-8.017,3.589-8.017,8.017c0,4.427,3.589,8.017,8.017,8.017h42.756 c4.427,0,8.017-3.589,8.017-8.017C358.08,89.101,354.491,85.511,350.063,85.511z"></path> </g> </g> </g></svg>
    ),
    tooltip: "controle-du-climat"
  },
  Radio: {
    matchTerms: ['radio', 'Radio'],
    icon: (
      <svg className='border mr-1 py-0.5 px-1 rounded hover:border-red-600 duration-300' height="30px" width="30px" fill="#818589" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M509.805,118.579c-1.902-4.014-5.603-7.111-10.295-8.035L57.239,23.54c-7.864-1.556-15.481,3.57-17.027,11.428 s3.572,15.482,11.429,17.027l303.608,59.725H14.501C6.492,111.72,0,118.214,0,126.221v348.016c0,8.007,6.492,14.501,14.501,14.501 h482.999c8.009,0,14.501-6.493,14.501-14.501V126.221C512,123.414,511.188,120.801,509.805,118.579z M482.999,459.738H29.001 V140.723h453.997V459.738z"></path> </g> </g> <g> <g> <path d="M372.005,267.06c-46.375,0-84.104,37.729-84.104,84.104s37.729,84.104,84.104,84.104 c46.375,0,84.104-37.729,84.104-84.104C456.109,304.79,418.381,267.06,372.005,267.06z M372.005,406.267 c-30.383,0-55.103-24.719-55.103-55.103c0-30.383,24.719-55.103,55.103-55.103c30.383,0,55.103,24.719,55.103,55.103 C427.107,381.548,402.389,406.267,372.005,406.267z"></path> </g> </g> <g> <g> <path d="M417.44,164.649H153.044v-0.483c0-8.007-6.492-14.501-14.501-14.501s-14.501,6.493-14.501,14.501v0.483H94.559 c-8.009,0-14.501,6.493-14.501,14.501v47.369c0,8.009,6.492,14.501,14.501,14.501h29.484v0.483 c0,8.007,6.492,14.501,14.501,14.501s14.501-6.493,14.501-14.501v-0.483H417.44c8.009,0,14.501-6.493,14.501-14.501V179.15 C431.94,171.143,425.448,164.649,417.44,164.649z M124.043,212.019H109.06v-18.368h14.984V212.019z M402.94,212.019H153.044 v-18.368H402.94V212.019z"></path> </g> </g> <g> <g> <path d="M210.733,278.661H95.358c-8.009,0-14.501,6.493-14.501,14.501s6.492,14.501,14.501,14.501h115.375 c8.009,0,14.501-6.492,14.501-14.501C225.233,285.154,218.741,278.661,210.733,278.661z"></path> </g> </g> <g> <g> <path d="M268.455,290.327c-0.189-0.927-0.464-1.842-0.827-2.712c-0.363-0.87-0.812-1.726-1.334-2.509 c-0.536-0.798-1.146-1.537-1.813-2.204s-1.407-1.276-2.204-1.798c-0.783-0.521-1.624-0.972-2.494-1.334 c-0.885-0.363-1.798-0.637-2.712-0.827c-1.871-0.377-3.799-0.377-5.67,0c-0.928,0.19-1.842,0.464-2.712,0.827 c-0.885,0.362-1.726,0.813-2.509,1.334c-0.798,0.522-1.537,1.131-2.204,1.798s-1.276,1.407-1.798,2.204 c-0.522,0.783-0.972,1.64-1.334,2.509s-0.638,1.784-0.827,2.712c-0.189,0.928-0.29,1.885-0.29,2.828c0,0.957,0.102,1.9,0.29,2.842 c0.188,0.928,0.464,1.842,0.827,2.712s0.812,1.711,1.334,2.507c0.522,0.783,1.131,1.523,1.798,2.19 c0.667,0.683,1.407,1.276,2.204,1.813c0.783,0.522,1.624,0.972,2.509,1.334c0.87,0.363,1.784,0.638,2.712,0.827 c0.928,0.189,1.885,0.276,2.828,0.276c0.943,0,1.9-0.088,2.842-0.276c0.914-0.188,1.827-0.464,2.712-0.827 c0.87-0.362,1.711-0.812,2.494-1.334c0.798-0.536,1.537-1.13,2.204-1.813c0.667-0.667,1.276-1.407,1.813-2.19 c0.522-0.798,0.972-1.639,1.334-2.507c0.362-0.872,0.638-1.784,0.827-2.712c0.188-0.943,0.276-1.885,0.276-2.842 C268.731,292.212,268.644,291.253,268.455,290.327z"></path> </g> </g> <g> <g> <path d="M210.733,394.666H95.358c-8.009,0-14.501,6.493-14.501,14.501c0,8.007,6.492,14.501,14.501,14.501h115.375 c8.009,0,14.501-6.493,14.501-14.501C225.233,401.16,218.741,394.666,210.733,394.666z"></path> </g> </g> <g> <g> <path d="M268.455,406.332c-0.188-0.927-0.464-1.842-0.826-2.712c-0.363-0.87-0.812-1.726-1.334-2.509 c-0.536-0.798-1.146-1.537-1.813-2.204c-0.667-0.667-1.407-1.276-2.204-1.798c-0.783-0.521-1.624-0.972-2.494-1.334 c-0.885-0.362-1.798-0.637-2.712-0.827c-1.871-0.377-3.799-0.377-5.67,0c-0.928,0.19-1.842,0.464-2.712,0.827 c-0.885,0.363-1.726,0.813-2.509,1.334c-0.798,0.522-1.537,1.131-2.204,1.798c-0.667,0.667-1.276,1.407-1.798,2.204 c-0.522,0.783-0.972,1.64-1.334,2.509s-0.638,1.784-0.827,2.712c-0.189,0.941-0.29,1.885-0.29,2.842 c0,3.814,1.552,7.54,4.249,10.252c0.667,0.667,1.407,1.26,2.204,1.797c0.783,0.522,1.624,0.972,2.509,1.334 c0.87,0.363,1.784,0.638,2.712,0.827c0.928,0.188,1.885,0.276,2.828,0.276c0.943,0,1.9-0.089,2.842-0.276 c0.914-0.189,1.827-0.464,2.712-0.827c0.87-0.362,1.711-0.812,2.494-1.334c0.798-0.536,1.537-1.13,2.204-1.797 c2.712-2.712,4.249-6.438,4.249-10.252C268.731,408.217,268.644,407.273,268.455,406.332z"></path> </g> </g> <g> <g> <path d="M225.233,336.664H138.86c-8.009,0-14.501,6.493-14.501,14.501s6.492,14.501,14.501,14.501h86.373 c8.009,0,14.501-6.493,14.501-14.501S233.242,336.664,225.233,336.664z"></path> </g> </g> <g> <g> <path d="M109.571,348.328c-0.189-0.928-0.464-1.843-0.827-2.712c-0.363-0.869-0.812-1.71-1.334-2.507 c-0.522-0.782-1.131-1.537-1.798-2.204c-0.667-0.667-1.407-1.276-2.204-1.798c-0.783-0.521-1.624-0.972-2.509-1.334 c-0.87-0.363-1.784-0.637-2.712-0.827c-1.871-0.377-3.799-0.377-5.67,0c-0.914,0.19-1.827,0.464-2.712,0.827 c-0.87,0.362-1.711,0.813-2.494,1.334c-0.798,0.522-1.537,1.131-2.219,1.798c-0.667,0.667-1.262,1.421-1.798,2.204 c-0.522,0.799-0.971,1.64-1.334,2.509c-0.362,0.869-0.638,1.784-0.827,2.712c-0.188,0.941-0.276,1.885-0.276,2.828 c0,0.957,0.087,1.9,0.276,2.842c0.189,0.928,0.464,1.842,0.827,2.712c0.363,0.87,0.812,1.711,1.334,2.507 c0.537,0.783,1.146,1.523,1.813,2.206c0.667,0.667,1.407,1.276,2.204,1.797c0.783,0.522,1.624,0.972,2.494,1.334 c0.885,0.363,1.798,0.638,2.712,0.827c0.943,0.188,1.9,0.29,2.842,0.29c3.814,0,7.555-1.552,10.252-4.249 c0.667-0.683,1.276-1.421,1.798-2.206c0.522-0.798,0.972-1.639,1.334-2.507c0.362-0.871,0.638-1.784,0.827-2.712 c0.188-0.943,0.29-1.885,0.29-2.842C109.861,350.213,109.76,349.269,109.571,348.328z"></path> </g> </g> </g></svg>
    ),
    tooltip: "radio"
  },
  ElectricDoorLocks: {
      matchTerms: ['Serrures de porte électrique', 'Serrures de porte électrique'],
      icon: (
        <svg className='border mr-1 py-1 px-1 rounded hover:border-red-600 duration-300' height="30px" width="30px" fill="#818589" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M25 12h-1v-3.816c0-4.589-3.32-8.184-8.037-8.184-4.736 0-7.963 3.671-7.963 8.184v3.816h-1c-2.206 0-4 1.794-4 4v12c0 2.206 1.794 4 4 4h18c2.206 0 4-1.794 4-4v-12c0-2.206-1.794-4-4-4zM10 8.184c0-3.409 2.33-6.184 5.963-6.184 3.596 0 6.037 2.716 6.037 6.184v3.816h-12v-3.816zM27 28c0 1.102-0.898 2-2 2h-18c-1.103 0-2-0.898-2-2v-12c0-1.102 0.897-2 2-2h18c1.102 0 2 0.898 2 2v12zM16 18c-1.104 0-2 0.895-2 2 0 0.738 0.405 1.376 1 1.723v3.277c0 0.552 0.448 1 1 1s1-0.448 1-1v-3.277c0.595-0.346 1-0.985 1-1.723 0-1.105-0.895-2-2-2z"></path> </g></svg>
      ),
      tooltip: "electric-door-locks"
  },
  Stereo: {
      matchTerms: ['Stéréo CD / MP3', 'Stéréo CD / MP3'],
      icon: (
          <svg className='border mr-1 py-0.5 px-0.5 rounded hover:border-red-600 duration-300' height="30px" width="30px" fill="#818589" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M238.345,70.621H8.828C3.953,70.621,0,74.573,0,79.448v353.103c0,4.875,3.953,8.828,8.828,8.828h229.517 c4.875,0,8.828-3.953,8.828-8.828V79.448C247.172,74.573,243.22,70.621,238.345,70.621z M229.517,423.724H17.655V88.276h211.862 V423.724z"></path> </g> </g> <g> <g> <path d="M503.172,70.621H273.655c-4.875,0-8.828,3.953-8.828,8.828v353.103c0,4.875,3.953,8.828,8.828,8.828h229.517 c4.875,0,8.828-3.953,8.828-8.828V79.448C512,74.573,508.047,70.621,503.172,70.621z M494.345,423.724H282.483V88.276h211.862 V423.724z"></path> </g> </g> <g> <g> <path d="M123.338,123.932C99,123.932,79.2,143.733,79.2,168.07c0,24.337,19.8,44.138,44.138,44.138s44.138-19.8,44.138-44.138 C167.476,143.733,147.677,123.932,123.338,123.932z M123.338,194.553c-14.604,0-26.483-11.88-26.483-26.483 c0-14.602,11.879-26.483,26.483-26.483s26.483,11.88,26.483,26.483C149.821,182.672,137.942,194.553,123.338,194.553z"></path> </g> </g> <g> <g> <path d="M388.166,123.932c-24.338,0-44.138,19.801-44.138,44.138c0,24.337,19.8,44.138,44.138,44.138s44.138-19.8,44.138-44.138 C432.304,143.733,412.504,123.932,388.166,123.932z M388.166,194.553c-14.604,0-26.483-11.88-26.483-26.483 c0-14.602,11.879-26.483,26.483-26.483c14.603,0,26.483,11.88,26.483,26.483C414.649,182.672,402.769,194.553,388.166,194.553z"></path> </g> </g> <g> <g> <path d="M123.338,247.518c-38.94,0-70.621,31.68-70.621,70.621c0,38.941,31.681,70.621,70.621,70.621s70.621-31.68,70.621-70.621 C193.959,279.198,162.278,247.518,123.338,247.518z M123.338,371.104c-29.205,0-52.966-23.76-52.966-52.966 c0-29.206,23.761-52.966,52.966-52.966c29.205,0,52.966,23.76,52.966,52.966C176.304,347.345,152.543,371.104,123.338,371.104z"></path> </g> </g> <g> <g> <path d="M388.166,247.518c-38.94,0-70.621,31.68-70.621,70.621c0,38.941,31.681,70.621,70.621,70.621s70.621-31.68,70.621-70.621 C458.787,279.198,427.106,247.518,388.166,247.518z M388.166,371.104c-29.205,0-52.966-23.76-52.966-52.966 c0-29.206,23.761-52.966,52.966-52.966c29.205,0,52.966,23.76,52.966,52.966C441.131,347.345,417.371,371.104,388.166,371.104z"></path> </g> </g> </g></svg>
      ),
      tooltip: "stereo"
  },
  ElectricWindows: {
      matchTerms: ['Vitres électriques', 'Vitres électriques'],
      icon: (
          <svg className='border mr-1 py-0.5 px-0.5 rounded hover:border-red-600 duration-300' height="30px" width="30px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#818589" d="M149.6 41L42.88 254.4c23.8 24.3 53.54 58.8 78.42 97.4 24.5 38.1 44.1 79.7 47.1 119.2h270.3L423.3 41H149.6zM164 64h230l8 192H74l90-192zm86.8 17.99l-141 154.81L339.3 81.99h-88.5zM336 279h64v18h-64v-18z"></path></g></svg>                            
      ),
      tooltip: "electric-windows"
  },
};

const EquipementIcon = ({ equipementKey, tooltipContent }) => {
  const config = EQUIPEMENT_CONFIGS[equipementKey];
  const tooltipId = `tooltip-${equipementKey}`;

  return (
    <div className="inline-block">
      <Tooltip id={tooltipId} style={{ backgroundColor: '#030712' }} />
      <div data-tooltip-id={tooltipId} data-tooltip-content={tooltipContent || config.tooltip}>
        {config.icon}
      </div>
    </div>
  );
};

const CarEquipements = ({ equipements }) => {
  const hasEquipement = (equipement, matchTerms) => {
    return matchTerms.some(term => 
      equipement.toLowerCase().includes(term.toLowerCase())
    );
  };

  const extractFeatureValue = (equipement, matchTerms) => {
    const matchedTerm = matchTerms.find(term => 
      equipement.toLowerCase().includes(term.toLowerCase())
    );
    return equipement;
  };

  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(EQUIPEMENT_CONFIGS).map(([key, config]) => {
        const matchingEquipement = equipements.find(equipement => 
          hasEquipement(equipement, config.matchTerms)
        );

        if (matchingEquipement) {
          return (
            <EquipementIcon
              key={key}
              equipementKey={key}
              tooltipContent={extractFeatureValue(matchingEquipement, config.matchTerms)}
            />
          );
        }
        return null;
      })}
    </div>
  );
};








// Currency conversion rates object
const CURRENCY_RATES = {
  'MAD': 1,      // Base currency (MAD)
  'USD': 0.095,  // 1 MAD = 0.095 USD
  'EUR': 0.081   // 1 MAD = 0.081 EUR
};

// Currency display configuration
const CURRENCY_CONFIG = {
  'MAD': { symbol: 'DH', position: 'after' },
  'USD': { symbol: '$', position: 'before' },
  'EUR': { symbol: '€', position: 'after' }
};

// Format price with currency
const formatPrice = (price, currencyCode) => {
  const config = CURRENCY_CONFIG[currencyCode];
  const formattedNumber = price.toFixed(0);
  
  return config.position === 'before' 
    ? `${config.symbol}${formattedNumber}`
    : `${formattedNumber} ${config.symbol}`;
};

// Convert price between currencies
const convertPrice = (price, fromCurrency, toCurrency) => {
  // If the target currency is MAD, return the price directly
  if (toCurrency === 'MAD dh') {
      return price; // No conversion needed
  }

  // First convert to MAD (base currency)
  const priceInMAD = fromCurrency === 'MAD dh' 
    ? price 
    : price / CURRENCY_RATES[fromCurrency];
  
  // Then convert to target currency
  return toCurrency === 'MAD dh' 
    ? priceInMAD 
    : priceInMAD * CURRENCY_RATES[toCurrency];
};




const CarsForRent = ({ selectedCurrency, selectedCategories, selectedPickupFeature, selectedDefaultEquipement, selectedFeatures, filteredCarPrice, availableCarsState, availableCarsFromBokkingForm, loader, finalDateTime, finalDestination, setFilteredCarsLengthByCurrentLocation }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredCars, setFilteredCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [priceArrowTop, setPriceArrowTop] = useState("#c53030"); 
  const [priceArrowDown, setPriceArrowDown] = useState("#c53030"); 
  const itemsPerPage = 2;


  const [colsCards, setColsCards] = useState(false);
  const [rowsCards, setRrowsCards] = useState(true);


   // Extract currency code from selectedCurrency or default to MAD
   const currencyCode = selectedCurrency ? selectedCurrency.split(' ')[0] : 'MAD dh';

   // Format price with currency symbol
  //  const displayTotalPrice = formatPrice(convertPrice(totalPrice, 'MAD dh', currencyCode), currencyCode);

  

  useEffect(() => {
      const fetchHomeCardCar = async () => {
          try {
              setLoading(true);
              const response = await axios.get('https://carrentreactdjango-production.up.railway.app/api/home-car-card/');
              const formattedCars = response.data.data.map(car => ({
                  id: car.id,
                  name: car.name,
                  image: `https://carrentreactdjango-production.up.railway.app${car.image}`,
                  is_available: car.is_available,
                  slug: car.slug,
                  car_size: car.car_size_display,
                  price: car.price_per_day,
                  car_features: car.car_features.map(feature => feature.name),
                  default_equipements: car.default_equipment.map(equipement => equipement.name),
                  category: car.category.name,
                  brand: `https://carrentreactdjango-production.up.railway.app${car.brand}`,
                  pickup_features: car.pickup_features.map((pickup_feature) => pickup_feature.name),
                  current_location: car.current_location.name,
              }));
              setCars(formattedCars);
              console.log('cars objects data...', response.data.data);
              console.log('Available cars state in cars rent page...', availableCarsState);
              console.log('date time booking form from carspage in cars rent page...', finalDateTime);
              console.log('final destination in cars rent page...', finalDestination);

          } catch (error) {
              console.error('Error fetching cars:', error);
          } finally {
              setLoading(false);
          }
      };

      fetchHomeCardCar();
  }, [availableCarsState]);

  useEffect(() => {
    // Call filtering function every time the filtered price range changes
    // Trigger filtering logic here if needed
  }, [filteredCarPrice, finalDateTime, finalDestination]);


  useEffect(() => {
    // Step 1: Filter based on available cars from both `availableCarsState` and `availableCarsFromBokkingForm`
    const availableCarsNames = [...availableCarsState, ...availableCarsFromBokkingForm].map(car =>
        car.name.trim().toLowerCase()
    );

    const nameFilteredCars = availableCarsNames.length > 0
        ? cars.filter(car => availableCarsNames.includes(car.name.trim().toLowerCase()))
        : cars; // Use all cars if no available cars specified

    // Step 2: Apply category filtering
    const categoryFilteredCars = selectedCategories.length > 0
        ? nameFilteredCars.filter(car => {
            const flatSelectedCategories = selectedCategories.flat();
            return flatSelectedCategories.some(selectedCategory =>
                selectedCategory.trim().toLowerCase() === car.category.trim().toLowerCase()
            );
        })
        : nameFilteredCars;

    // Step 3: Filter by default equipment
    const DefaultEquipments = selectedDefaultEquipement.length > 0
        ? categoryFilteredCars.filter(car => {
            const flatselectedDefaultEquipement = selectedDefaultEquipement.flat();
            return flatselectedDefaultEquipement.some(selectedDefaultEquipement =>
                car.default_equipements.some(defaultEquipement =>
                    defaultEquipement.trim().toLowerCase() === selectedDefaultEquipement.trim().toLowerCase()
                )
            );
        })
        : categoryFilteredCars;

    // Step 4: Filter by features
    const Features = selectedFeatures.length > 0
        ? DefaultEquipments.filter(car => {
            const flatSelectedFeatures = selectedFeatures.flat();
            return flatSelectedFeatures.some(selectedFeature =>
                car.car_features.some(carFeature =>
                    carFeature.trim().toLowerCase() === selectedFeature.trim().toLowerCase()
                )
            );
        })
        : DefaultEquipments;

    // Step 5: Filter by price range
    const priceFilteredCars = filteredCarPrice.length > 0
        ? Features.filter(car => {
            const price = Number(car.price.replace(/[^0-9.-]+/g, ''));
            return filteredCarPrice.some(({ low, high }) =>
                price >= low && price <= high
            );
        })
        : Features;

    // Step 6: Filter by pickup feature
    const finalFilteredCars = selectedPickupFeature.length > 0
        ? priceFilteredCars.filter(car => {
            const flatSelectedPickupFeature = selectedPickupFeature.flat();
            return flatSelectedPickupFeature.some(selectedPickupFeature =>
                car.pickup_features.some(pickupFeature =>
                    pickupFeature.trim().toLowerCase() === selectedPickupFeature.trim().toLowerCase()
                )
            );
        })
        : priceFilteredCars;

    // Step 7: Filter by current location matching final destination
    const locationFilteredCars = finalDestination?.selectedOptionDestination1?.label
        ? finalFilteredCars.filter(car => {
            return car.current_location.toLowerCase() === finalDestination.selectedOptionDestination1.label.toLowerCase();
        })
        : finalFilteredCars;

    // Set the length of filtered cars by current location
    setFilteredCarsLengthByCurrentLocation(locationFilteredCars.length);

    // Step 8: Apply sorting if configured
    let sortedCars = [...locationFilteredCars];
    if (sortConfig.key) {
        sortedCars.sort((a, b) => {
            if (sortConfig.key === 'price') {
                const priceA = Number(a.price.replace(/[^0-9.-]+/g, ''));
                const priceB = Number(b.price.replace(/[^0-9.-]+/g, ''));
                return sortConfig.direction === 'asc' ? priceA - priceB : priceB - priceA;
            }
            if (sortConfig.key === 'name') {
                return sortConfig.direction === 'asc'
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            }
            return 0;
        });
    }

    setFilteredCars(sortedCars);
    setCurrentPage(1); // Reset to the first page when filters change

}, [cars, availableCarsState, availableCarsFromBokkingForm, setFilteredCarsLengthByCurrentLocation, selectedCategories, selectedPickupFeature, selectedDefaultEquipement, selectedFeatures, filteredCarPrice, finalDestination, sortConfig]);


  // Sort handler
  const handleSort = (key) => {
    setSortConfig(current => {
        const isAsc = current.key === key && current.direction === 'asc';
        // Toggle color for top and down arrows based on sort direction
        setPriceArrowTop(isAsc ? "#c53030" : "#ffffff"); // Red arrow for ascending
        setPriceArrowDown(isAsc ? "#ffffff" : "#c53030"); // Red arrow for descending
        return {
            key,
            direction: isAsc ? 'desc' : 'asc'
        };
    });
};

  const handleChangeCardsToRowsStyle = () => {
      setRrowsCards(true);
      setColsCards(false);
  };

  const handleChangeCardsToColsStyle = () => {
      setColsCards(true);
      setRrowsCards(false);
  };

  // Pagination calculations
  const indexOfLastCar = currentPage * itemsPerPage;
  const indexOfFirstCar = indexOfLastCar - itemsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const pageCount = Math.ceil(filteredCars.length / itemsPerPage);

  const handlePageChange = (event, value) => {
      setCurrentPage(value);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    console.log('finalDateTime before Link:', finalDateTime);
}, [finalDateTime]);
  

  return (
      <div className="col-span-3 mt-4 md:mt-9 md:ml-4">
          <div className="bg-neutral-950 w-full text-white pr-4">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-2 md:space-y-0">
              <ul className="flex text-red-600 flex-wrap">
                <li className={`hover:bg-red-600 hover:text-white mr-1 cursor-pointer py-1.5 px-2 ${sortConfig.key === 'newest' ? 'bg-red-600 text-white' : ''}`}
                    onClick={() => handleSort('newest')}>
                    Nouveau
                </li>
                <li className={`hover:bg-red-600 hover:text-white mr-1 cursor-pointer py-1.5 px-2 ${sortConfig.key === 'price' && sortConfig.direction === 'asc' ? 'bg-red-600 text-white' : ''}`}
                    onClick={() => handleSort('price')}>
                    Price (<FaLongArrowAltUp className='inline-block -mx-[2px]' size={14} />)
                </li>
                <li className={`hover:bg-red-600 hover:text-white mr-1 cursor-pointer py-1.5 px-2 ${sortConfig.key === 'price' && sortConfig.direction === 'desc' ? 'bg-red-600 text-white' : ''}`}
                    onClick={() => handleSort('price')}>
                    Price (<FaLongArrowAltDown className='inline-block -mx-[2px]' size={14} />)
                </li>
                <li className={`hover:bg-red-600 hover:text-white mr-1 cursor-pointer py-1.5 px-2 ${sortConfig.key === 'name' && sortConfig.direction === 'asc' ? 'bg-red-600 text-white' : ''}`}
                    onClick={() => handleSort('name')}>
                    Nom (A-Z)
                </li>
                <li className={`hover:bg-red-600 hover:text-white mr-1 cursor-pointer py-1.5 px-2 ${sortConfig.key === 'name' && sortConfig.direction === 'desc' ? 'bg-red-600 text-white' : ''}`}
                    onClick={() => handleSort('name')}>
                    Nom (Z-A)
                </li>
              </ul>

              <ul className="flex text-red-600 gap-4 relative py-1.5">
                      <li className="text-white">
                          <div onClick={handleChangeCardsToColsStyle}>
                              <svg fill="#ffffff" className={`${colsCards ? "active" : ""} cursor-pointer absolute right-7`} style={{ top: '4px' }} height={30} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <g strokeWidth="0" transform="translate(2.16,2.16), scale(0.82)">
                                      <rect x="0" y="0" width="24" height="24" rx="0" />
                                  </g>
                                  <g strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.336"></g>
                                  <g>
                                      <defs>
                                          <style>{`.cls-1{fill:none;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.5px;}`}</style>
                                      </defs>
                                      <g>
                                          <rect className="cls-1" x="2" y="2" width="20" height="20" rx="2" />
                                          <line className="cls-1" x1="2" y1="12" x2="22" y2="12" />
                                          <line className="cls-1" x1="12" y1="2" x2="12" y2="22" />
                                      </g>
                                  </g>
                              </svg>
                          </div>
                      </li>
                      <li>
                          <div onClick={handleChangeCardsToRowsStyle}>
                              <svg fill="#ffffff" className={`${rowsCards ? "active" : ""} cursor-pointer`} style={{ borderRadius: '6px' }} height={25} version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 64.00 64.00" enable-background="new 0 0 64 64" xmlSpace="preserve" transform="rotate(270)">
                                  <g id="SVGRepo_bgCarrier" stroke-width="0">
                                      <rect x="0" y="0" width="64.00" height="64.00" rx="0" strokeWidth="0"></rect>
                                  </g>
                                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                  <g id="SVGRepo_iconCarrier">
                                      <rect x="1" y="1" fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" width="62" height="14"></rect>
                                      <rect x="1" y="15" fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" width="15" height="48"></rect>
                                      <rect x="16" y="15" fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" width="16" height="48"></rect>
                                      <rect x="32" y="15" fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" width="15" height="48"></rect>
                                      <rect x="47" y="15" fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" width="16" height="48"></rect>
                                  </g>
                              </svg>
                          </div>
                      </li>
              </ul>
            </div>
          </div>

          {/* CARS THAT TAKING WHOLE WIDTH */}
          <div className={`${colsCards ? "hidden" : ""} mb-4`}>
              {currentCars.map((car, index) => (
                    <div key={index} className="border hover:border-red-600 hover:shadow-lg duration-300 border-sm pl-4 py-4 border-gray-200 mt-4 w-full grid grid-cols-7">
                        <div className="col-span-7 md:col-span-2 pl-2">
                          <Link to={`/location-de-voitures/${car.slug}`} state={{car, finalDateTime, finalDestination}}><img src={car.image} alt={car.name} className='md:w-[120px]' /></Link>
                          <Link to={`/location-de-voitures/${car.slug}`} state={{car, finalDateTime, finalDestination}} className='text-sm text-red-600 cursor-pointer'>{car.name}</Link>
                        </div>
                        <div className="col-span-7 mt-2 md:mt-0 md:col-span-2 flex md:ml-[1px] items-center md:-ml-6">
                            <div className='flex flex-col'>
                                <div>
                                    <CarFeatures features={car.car_features} />
                                </div>
                                <div className='mt-3'>
                                    <CarEquipements equipements={car.default_equipements} />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-7 md:col-span-1 pt-2 md:pt-6">
                            <div className='flex items-center'>
                                <div className='flex justify-center'>
                                    <div className='flex items-center justify-center flex-wrap'>
                                      {car.pickup_features.map((pickupFeature) => (
                                        <div className='mr-1'>
                                            <Tooltip id="pick-up-location-1" style={{backgroundColor: '#030712'}} />
                                            <svg data-tooltip-id="pick-up-location-1" data-tooltip-content={pickupFeature} className='bg-gray-400 px-1 py-1 rounded hover:border border border-white hover:border-red-600 duration-300 rounded-md' height="35px" fill="#ffffff" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0L0 6V8H1V15H4V10H7V15H15V8H16V6L14 4.5V1H11V2.25L8 0ZM9 10H12V13H9V10Z"></path> </g></svg>
                                        </div>
                                      ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-7 md:col-span-2 mt-1 md:mt-0 md:ml-9 -mt-1">
                            <p className='text-4xl font-medium mb-4 text-gray-600'>{formatPrice(convertPrice(car.price, 'MAD dh', currencyCode), currencyCode)} <span className='text-lg -ml-2 font-light'>/jour</span></p>
                            <Link to={`/location-de-voitures/${car.slug}`} state={{car, finalDateTime, finalDestination}} className='bg-red-600 text-white py-2 mt-2 rounded hover:bg-red-500 duration-150 px-3'>Sélectionner</Link>
                        </div>
                    </div>
                ))}
          </div>


            {/* CARS WITH 3 ITEMS FOR EACH LINE */}
            <div className={`${rowsCards ? "hidden": ""}`}>
                <div className='grid grid-cols-3 lg:-mr-9 lg:ml-4 mt-6 pt-8'>
                {currentCars.map((car, index) => (
                  <div key={index} className='col-span-3 lg:col-span-1 mb-6 mx-2'>
                            <Link to={`/location-de-voitures/${car.slug}`} state={{car, finalDateTime, finalDestination}}><img className='cursor-pointer h-56 sm:h-96 lg:h-40 object-cover w-full' src={car.image} alt="Car 1" /></Link>
                            <Link to={`/location-de-voitures/${car.slug}`} state={{car, finalDateTime, finalDestination}} className='text-xl text-gray-800 hover:text-gray-950 duration-300 font-semibold'>{car.name}</Link>
                            <p className='text-sm text-gray-500'>{car.category.name}</p>
                            <p className='font-semibold text-red-600'>{formatPrice(convertPrice(car.price, 'MAD dh', currencyCode), currencyCode)} <span className='text-sm text-gray-500'>/jour</span></p>
                        </div>
                    ))}
                </div>
            </div>


          {pageCount > 1 && (
            <div className='w-full flex my-4 justify-center'>
              <Pagination
                  shape='rounded'
                  count={pageCount}
                  page={currentPage}
                  onChange={handlePageChange}
                  variant='outlined'
              />
            </div>
          )}

            <div className={`loaderPosition ${!loader ? 'invisible': 'visible'}`}>
              <div className="loaderBg"></div>
              <span class="loader"></span>
            </div>
        </div>
    );
};

export default CarsForRent;
