

# importing the module 
import cv2 
   
# function to display the coordinates of 
# of the points clicked on the image  
currentPointIndex = 1
# coordinatesScale = 1

names = ["idcs/Saba", "itko/Tokyo", "ipph/Perth", "ilkl/Lukla", "iscm/RAF Scampton", "ijaf/Al Najaf", "izol/Izolirani", "ilar/Larnaca", "ipap/Paphos", "ibar/Barra", "iiab/AB McConnel", "ihen/Henstridge Airfield", "itrn/Training Centre", "irfd/Rockford", "0w0/Waterport", "iblt/Baltic Airfield", "igar/AB Garry", "imlr/Mellor", "isau/Sauthemptona", "igrv/Grindavik", "ibth/Saint Barthélemy", "iskp/Skopelos"]
types = {
   'WPT': 'NavTypes.WAYPOINT',
   'VDME': 'NavTypes.VORDME',
   'VTAC': 'NavTypes.VORTAC',
   'TAC': 'NavTypes.TACAN'
}
fir = 'FIRs.SAINT_BARTHELEMY'
airportCollection = True

def click_event(event, x, y, flags, params): 
  
    # checking for left mouse clicks 
    if event == cv2.EVENT_LBUTTONDOWN:   
        # displaying the coordinates 
        # on the Shell 
        print(x, ' ', h-y) 
  
        # displaying the coordinates 
        # on the image window 
        font = cv2.FONT_HERSHEY_SIMPLEX 
        global currentPointIndex
        cv2.putText(img, '[' + str(currentPointIndex) + '] ', (x,y+20), font, 
                    0.3, (255, 0, 255), 1) 
        cv2.imshow('image', img) 
        currentPointIndex = currentPointIndex + 1
        name = names[currentPointIndex-2]
        ident = ''
        fixTypeShort = None
        split = name.split('/')
        if(len(split) == 2):
           ident = split[0].upper()
           fixTypeShort = split[1].upper()
        else: ident = split[0].upper()

        # global coordinatesScale
        global fir
        global airportCollection
        if(airportCollection):
          with open('./src/data/points.txt', 'a') as file:
           file.write('{{\n  x: {x},\n  y: {y},\n  identifier: \'{ident}\',\n  name: \'{name}\',\n}},\n'.format(x = x, y = h-y, ident=ident, name=fixTypeShort))
           file.close()
        else:
          if(fixTypeShort):
            with open('./src/data/points.txt', 'a') as file:
              file.write('{{\n  x: {x},\n  y: {y},\n  identifier: \'{name}\',\n  fir: {fir},\n  type: {type}, \n}},\n'.format(x = x, y = h-y, name=ident, type=types[fixTypeShort], fir=fir))
              file.close()
          else:
             with open('./src/data/points.txt', 'a') as file:
              file.write('{{\n  x: {x},\n  y: {y},\n  identifier: \'{name}\',\n  fir: {fir},\n  type: NavTypes.WAYPOINT, \n}},\n'.format(x = x, y = h-y, name=ident, fir=fir))
              file.close()
        
        
  
    # checking for right mouse clicks      
    if event==cv2.EVENT_RBUTTONDOWN: 
  
        # displaying the coordinates 
        # on the Shell 
        # print(x, ' ', y) 
  
        # displaying the coordinates 
        # on the image window 
        font = cv2.FONT_HERSHEY_SIMPLEX 
        b = img[y, x, 0] 
        g = img[y, x, 1] 
        r = img[y, x, 2] 
        cv2.putText(img,
                    str(b) + ',' + str(g) + ',' + str(r), 
                    (x,y), font, 0.0001, 
                    (255, 255, 0), 2) 
        cv2.imshow('image', img) 
  
# driver function 
if __name__=="__main__": 
    # cv2.namedWindow('image', cv2.WINDOW_NORMAL)
    # reading the image 
    img = cv2.imread('./src/assets/Enroute_Chart_PTFS.png', 1) 
    w, h, c = img.shape
    print(h, w)

    # displaying the image 
    cv2.imshow('image', img) 
  
    # setting mouse handler for the image 
    # and calling the click_event() function 
    cv2.setMouseCallback('image', click_event) 
  
    # wait for a key to be pressed to exit 
    cv2.waitKey(0) 
  
    # close the window 
    cv2.destroyAllWindows() 