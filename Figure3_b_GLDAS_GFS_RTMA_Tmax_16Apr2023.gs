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
"sdfopen Tmax_GLDAS_20230416.AIRTEMP.nc4"
"set lon 73 89"
"set lat 15 32"
"set xlopts 1 5 0.15"
"set ylopts 1 5 0.15"
"set xlint 2"
"set ylint 2"
"set mpdset hires"
"set gxout shaded"
"set clevs 24 26 28 30 32 34 36 38 40 42 45 47"
"set ccols 0 37 40 45 51 55 59 63 67 71 75 79 83 86"
"d tair_f_inst-273.16"
"draw shp sd_boundary.shp"
"run grmask.gs"
"draw title GLDAS_Tmax"
"run cbarn"
"printim GLDAS_April16042023-MAXTEMP_GWB_VIDARB.jpg x1000 y741 white"
"close 1"
"reinit"
"sdfopen Tmax_GFSmaster.t00z.15042023_T24hrs.nc"
"set lon 73 89"
"set lat 15 32"
"set xlopts 1 5 0.15"
"set ylopts 1 5 0.15"
"set xlint 2"
"set ylint 2"
"set grid off"
"set grads off"
"set mpdset hires"
"set gxout shaded"
"set clevs 24 26 28 30 32 34 36 38 40 42 45 47"
"set ccols 0 37 40 45 51 55 59 63 67 71 75 79 83 86"
"d tmax_2mabovegro-273.16"
"draw shp sd_boundary.shp"
"run grmask.gs"
"draw title GFS_DMO_Tmax"
"run cbarn"
"printim GFS_April16042023-MAXTEMP_GWB_VIDARB.jpg x1000 y741 white"
"close 1"
"reinit"
"sdfopen Tmax_inrtma.t00z.16042023_T24hrs.nc"
"set lon 73 89"
"set lat 15 32"
"set xlopts 1 5 0.15"
"set ylopts 1 5 0.15"
"set xlint 2"
"set ylint 2"
"set grid off"
"set grads off"
"set mpdset hires"
"set gxout shaded"
"set clevs 24 26 28 30 32 34 36 38 40 42 45 47"
"set ccols 0 37 40 45 51 55 59 63 67 71 75 79 83 86"
"d tmp_2mabovegrou-273.16"
"draw shp sd_boundary.shp"
"run grmask.gs"
"draw title RTMA_Tmax"
"run cbarn"
"printim RTMA_April16042023-MAXTEMP_GWB_VIDARB.jpg x1000 y741 white"
"close 1"
"quit"
 
