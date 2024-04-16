"reinit"
"set display color white"
"c"
"set grid off"
"set grads off"
**********************************************************************************
'set rgb 33 248 50 60'
'set rgb 34 255 50 89'
'set rgb 35 255 50 185'
'set rgb 36 248 50 255'
'set rgb 37 224 50 255'
'set rgb 38 195 50 255'
'set rgb 39 175 50 255'
'set rgb 40 161 50 255'
'set rgb 41 137 50 255'
'set rgb 42 118 74 255'
'set rgb 43 98 74 255'
'set rgb 44 79 50 255'
'set rgb 45 50 50 255'
'set rgb 46 50 74 255'
'set rgb 47 50 89 255'
'set rgb 48 50 113 255'
'set rgb 49 50 146 255'
'set rgb 50 50 175 255'
'set rgb 51 50 204 255'
'set rgb 52 50 224 255'
'set rgb 53 50 255 253'
'set rgb 54 50 255 228'
'set rgb 55 50 255 200'
'set rgb 56 50 255 161'
'set rgb 57 50 255 132'
'set rgb 58 50 255 103'
'set rgb 59 50 255 79'
'set rgb 60 50 255 60'
'set rgb 61 79 255 50'
'set rgb 62 132 255 50'
'set rgb 63 171 255 50'
'set rgb 64 204 255 50'
'set rgb 65 224 255 50'
'set rgb 66 253 255 50'
'set rgb 67 255 233 50'
'set rgb 68 255 224 50'
'set rgb 69 255 209 50'
'set rgb 70 255 204 50'
'set rgb 71 255 185 50'
'set rgb 72 255 161 50'
'set rgb 73 255 146 50'
'set rgb 74 255 127 50'
'set rgb 75 255 118 50'
'set rgb 76 255 93 50'
'set rgb 77 255 74 50'
'set rgb 78 255 60 50'
'set rgb 79 255 33 33'
'set rgb 80 255 0 0'
'set rgb 81 235 10 0'
'set rgb 82 215 20 0'
'set rgb 83 195 30 0'
'set rgb 84 175 40 0'
'set rgb 85 165 45 0'
'set rgb 86 155 50 0'
'set rgb 87 145 55 0'
'set rgb 88 135 60 0'
'set rgb 89 120 60 0'
'set rgb 90 100 60 0'
'set rgb 91 80 60 0'
'set rgb 20 250 240 230'
'set rgb 21 240 220 210'
'set rgb 22 225 190 180'
'set rgb 23 200 160 150'
'set rgb 24 180 140 130'
'set rgb 25 160 120 110'
'set rgb 26 140 100 90'
*******************************************
"sdfopen GFSmaster.t00z.grb2_11042023_T24hrs_4Var.nc"
"define T1=max((tmax_2mabovegro-273.16), t=1,t=8)"
"close 1"
"sdfopen GFSmaster.t00z.grb2_12042023_T24hrs_4Var.nc"
"define T2=max((tmax_2mabovegro-273.16), t=1,t=8)"
"close 1"
"sdfopen GFSmaster.t00z.grb2_13042023_T24hrs_4Var.nc"
"define T3=max((tmax_2mabovegro-273.16), t=1,t=8)"
"close 1"
"sdfopen GFSmaster.t00z.grb2_14042023_T24hrs_4Var.nc"
"define T4=max((tmax_2mabovegro-273.16), t=1,t=8)"
"close 1"
"sdfopen GFSmaster.t00z.grb2_15042023_T24hrs_4Var.nc"
"define T5=max((tmax_2mabovegro-273.16), t=1,t=8)"
"close 1"
"sdfopen GFSmaster.t00z.grb2_16042023_T24hrs_4Var.nc"
"define T6=max((tmax_2mabovegro-273.16), t=1,t=8)"
"close 1"
"sdfopen GFSmaster.t00z.grb2_17042023_T24hrs_4Var.nc"
"define T7=max((tmax_2mabovegro-273.16), t=1,t=8)"
"close 1"
"sdfopen GFSmaster.t00z.grb2_18042023_T24hrs_4Var.nc"
"define T8=max((tmax_2mabovegro-273.16), t=1,t=8)"
"close 1"
"sdfopen GFSmaster.t00z.grb2_19042023_T24hrs_4Var.nc"
"set lon 66.5 96.5"
"set lat 7.5 37.5"
"set xlopts 1 5 0.15"
"set ylopts 1 5 0.15"
"set xlint 4"
"set ylint 4"
"set mpdset rupres"
"set gxout shaded"
"set clevs 24 26 28 30 32 34 36 38 40 42 45 47"
"set ccols 0 37 40 45 51 55 59 63 67 71 75 79 83 86"
"define T9=max((tmax_2mabovegro-273.16), t=1,t=8)"
"define Tmax=(T1+T2+T3+T4+T5+T6+T7+T8+T9)/9"
"d smth9(Tmax)"
"draw shp sd_boundary.shp"
"run grmask.gs"
"draw title GFS_MeanTmax"
"run cbarn"
"set vpage off"
"printim  GFSDMO_April12_20_2023_Ind-MeanTEMP.jpg x1000 y741 white"
"quit"
