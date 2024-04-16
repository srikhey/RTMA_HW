;***************************************************************
; heat_2.ncl    
;
; Concepts illustrated:
;   - Specifying options at the top of script
;   - Opening neding a netCDF file
;   - Computing relative humidity via temperature and specific humidity
;   - Computing a Heat Index (HI) for each time (here, hourly values)
;   - Computing the max daily value at each grid point
;   - Smoothing the hourly HI values to minimize 'noisey' values
;   - Plotting the max HI over the 2004-2005 period at each grid point
;   - Writing a netCDF with *two* unlimited dimensions
;***************************************************************
; Requires NCL 6.4.0 or higher
;***************************************************************
;       HEAT INDEX
;     degC    degF       Notes
;    27-32    80-91    Caution: fatigue & cramps possible with prolonged exposure and activity.
;    32-41    90-105   Extreme caution: cramps, heat exhaustion & heat stroke
;    41-54   105-130   Danger: cramps, heat exhaustion are likely; heat stroke is probable
;      54+     130+    Extreme danger: heat stroke is imminent.
;***************************************************************

;===========================================================================
; options
;===========================================================================
   load "$NCARG_ROOT/lib/ncarg/nclscripts/csm/gsn_code.ncl"
   load "$NCARG_ROOT/lib/ncarg/nclscripts/csm/gsn_csm.ncl"
   load "$NCARG_ROOT/lib/ncarg/nclscripts/wrf/WRFUserARW.ncl"
   load "$NCARG_ROOT/lib/ncarg/nclscripts/csm/contributed.ncl"
   ;load "$NCARG_ROOT/lib/ncarg/colormaps"
   begin
; Set some basic resources

   netCDF     = True
   if (netCDF) then
       filNc  = "GFS_HEATINDEX_24hr_20230412.nc"
       setfileoption("nc","Format","NetCDF4Classic")   ; only one unlimited dimension
;       setfileoption("nc","Format","NetCDF4")          ; multiple unlimited dimensions
   end if
                           ; heat_index_nws option
   io = (/1,0/)            ; degK input, degC output

;===========================================================================
; Open Model file
;===========================================================================

   fili = "GFSmaster.t00z.grb2_11042023_T24hrs_4Var.nc"  ;3hrly 
   f    = addfile(fili,"r") 
;   if (isatt(f,"case")) then
;       case = f@case
;   end if

;===========================================================================
; Read variable at user specified locations only
;===========================================================================
   latitude  = f->latitude           ; (lndgrid); same for all files
   longitude  = f->longitude          ;          "             "

   tref = f->TMP_2maboveground              ; K   
   xref = f->SPFH_2maboveground             ; kg/kg    specificic humidity
   psfc = f->PRES_surface                   ; Pa       close to REFHT    

   printVarSummary(latitude)          ; 
   printVarSummary(longitude)          ; 
   printVarSummary(tref)          ; tref: [time | 17520] x [ncol | 3]
   printMinMax(tref, 0)
   printVarSummary(xref)          ;       "               
   printMinMax(xref, 0)
   printVarSummary(psfc)          ;       "
   printMinMax(psfc, 0)

;===========================================================================
; Heat Index computations: National Weather Service method
;===========================================================================

   xref = relhum(tref, xref, psfc)       ; must be calculated; overwrite 
   xref@long_name = "relative humidity"
   xref@units     = "%"
   printMinMax(xref,0)

   delete( psfc )                        ; no longer needed 

   iou   = (/1,0/)                       ; input degK; output degC
   HI    = heat_index_nws(tref, xref, io, False) 
   printVarSummary(HI)                   ; [time | 17520] x [ncol | 48602]
   printMinMax(HI, 0)                    ; heat index: NWS: min=-76.0405   max=234.646

   delete( [/tref, xref/] )              ; no longer needed

   HImax = calculate_daily_values(HI, "max", 0, False)   ; contributed.ncl
   HImax@long_name = "GFS HI on 11042023 valid for 12042023"
   if (isatt(HImax, "time")) then
       delete(HImax@time)                ; historical artifact
   end if
   print("---")
   printVarSummary(HImax)
   printMinMax(HImax, 0)

;===========================================================================
; time for netCDF and Plot
;===========================================================================

   time = HI&time                     ; ALL times ('time')
   dimt = dimsizes(time)
   ntim = dimt(0)

   ymdhms    = cd_calendar(time, 0)
   yyyy      = toint(ymdhms(:,0))
   mm        = toint(ymdhms(:,1))
   dd        = toint(ymdhms(:,2))
   hh        = toint(ymdhms(:,3))
   minit     = toint(ymdhms(:,4))
   sec       = toint(ymdhms(:,5))

   yrStrt    = yyyy(0)
   yrLast    = yyyy(ntim-1)
;   nyrs      = yrLast-yrStrt+1
   print("yrStrt="+yrStrt+"  yrLast="+yrLast)

   yyyy!0    = "yyyy"
   yyyy&yyyy =  yyyy
   yyyy@long_name = "current year"
   if (isatt(time,"calendar")) then
       yyyy@calendar  = time@calendar
   end if

   date      = yyyy*10000 + mm*100 + dd
   date!0    = "time"
   datesec   = hh*3600 + sec
   datesec!0 = "time"
   date@long_name    = "current date (YYYYMMDD)"
   datesec@long_name = "current seconds of current date"

; 'time' for HImax; there will be 2 different times on the file

   time_max           = HImax&time   ; for clarity and later netCDF use
   time_max@long_name = "time of day at which Heat Index max occurred"
   time_max!0         = "time_max"
   time_max&time_max  = time_max
   printVarSummary(time_max)
   HImax!0        = "time_max"       ;rename for netCDF
   HImax&time_max =  time_max
   printVarSummary(HImax)
   printVarSummary(HImax&time_max)   ; verify

;-------------------------

   if (netCDF) then

       filNc  = filNc
       pthNc  = filNc
       system("/bin/rm -f "+pthNc)       ; remove any pre-existing file
       ncdf = addfile(pthNc ,"c")        ; open output netCDF file

      ;===================================================================
      ; create global attributes of the file (optional)
      ;===================================================================
       fAtt               = True            ; assign file attributes
       fAtt@title         = "Heat Index Max (NWS method)"
       if (isvar("case")) then
          fAtt@case       = case
       end if
  
       fAtt@Conventions   = "None"
       fAtt@creation_date = systemfunc ("date")

       fileattdef( ncdf, fAtt )            ; copy file attributes
       filedimdef(ncdf,"time_max",-1,True) ;      time_max


       ncdf->latitude     = latitude       
       ncdf->longitude    = longitude       
       ncdf->HImax        = HImax               ; Max HI for each day
   end if
   end
