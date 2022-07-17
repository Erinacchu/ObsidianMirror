#### Aufgabe 2.17

Untersuchen Sie die Geraden G und G' auf Parallelität!
$$
(a)
~
~
G = 
\begin{pmatrix}
4 \\
-3 \\
2 
\end{pmatrix}
+
<
\begin{pmatrix}
-1 \\
5 \\
6 
\end{pmatrix}
>;
~
~
G' =
\begin{pmatrix}
3 \\
8 \\
7 
\end{pmatrix}
+
<
\begin{pmatrix}
3 \\
-15 \\
-18 
\end{pmatrix}
>
$$

$$
(b)
~
~
G = 
\begin{pmatrix}
4 \\
1 \\
7 
\end{pmatrix}
+
<
\begin{pmatrix}
3 \\
0 \\
5 
\end{pmatrix}
>;
~
~
G' =
\begin{pmatrix}
6 \\
5 \\
-3 
\end{pmatrix}
+
<
\begin{pmatrix}
3 \\
0 \\
1 
\end{pmatrix}
>
$$

Um zu überprüfen ob die Geraden parallel zueinander stehen, auf Lineare Unabhängigkeit überprüfen. 

==Parallelität besteht, wenn die Geraden linear unabhängig sind!==

(a)
Schritt 1:
$$
-3 * 
\begin{pmatrix}
-1 \\
5 \\
6 
\end{pmatrix}
=
\begin{pmatrix}
3 \\
-15 \\
-18 
\end{pmatrix}
$$
Schritt 2:
Überprüfen ob G' P ( 3 | 8 | 7 ) auf G liegt.
$$
\begin{pmatrix}
3 \\
8 \\
7 
\end{pmatrix}
=
\begin{pmatrix}
-1 \\
5 \\
6 
\end{pmatrix}
+
t *
\begin{pmatrix}
-1 \\
5 \\
6 
\end{pmatrix}
=
\begin{pmatrix}
-4 \\
45 \\
48 
\end{pmatrix}
$$
P liegt nicht auf G, also echt paralell.

(b) Lösung mit LGS
$$
\begin{equation}
\begin{matrix} 
   4 & 3 & 3 & | 0 \\
   1 & 0 & 0 & | 0 & swap \\
   7 & 5 & 1 & | 0 \\
   \end{matrix} 
\end{equation} 
$$
$$
\begin{equation}
   \begin{matrix} 
   1 & 0 & 0 & | 0  \\
   4 & 3 & 3 & | 0 & -4 * I \\
   7 & 5 & 1 & | 0 \\
   \end{matrix} 
\end{equation}
$$
$$
\begin{equation}
   \begin{matrix} 
   1 & 0 & 0 & | 0  \\
   0 & 3 & 3 & | 0 & :III \\
   7 & 5 & 1 & | 0 \
   \end{matrix} 
\end{equation}
$$
$$
\begin{equation}
   \begin{matrix} 
   1 & 0 & 0 & | 0  \\
   0 & 1 & 1 & | 0 \\
   7 & 5 & 1 & | 0 & -7*I \
   \end{matrix} 
\end{equation}
$$
$$
\begin{equation}
   \begin{matrix} 
   1 & 0 & 0 & | 0  \\
   0 & 1 & 1 & | 0 & -III \\
   0 & 5 & 1 & | 0 & -5*II\
   \end{matrix} 
\end{equation}
$$
$$
\begin{equation}
   \begin{matrix} 
   1 & 0 & 0 & | 0 \\
   0 & 1 & 0 & | 0 \\
   0 & 0 & 1 & | 0 \
   \end{matrix} 
\end{equation}
$$
=> Linear Unanbhängig, daher nicht parallel