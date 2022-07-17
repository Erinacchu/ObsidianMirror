 import numpy as np
 
 a = np.pi/4 #45
 c = np.cos(a)
 s = np.sin(a)
 
 R1 = np.array([[s, -c], [c, s]]) #rotationsmatrix
 
 evals, evecs = np.linalg.eig(R1)
 
 print(evals) #eigenvalues
 print(evecs) #eigenvector
