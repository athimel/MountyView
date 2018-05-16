# Pour télécharger la vue

    export TROLL=104259
    export PASS=xxxxxxxx
    export VUE2_URL="http://sp.mountyhall.com/SP_Vue2.php?Numero=$TROLL&Motdepasse=$PASS&Tresors=1&Lieux=1&Champignons=1"
    export VUE2_FILE=$TROLL.txt
    curl -fSL $VUE2_URL -o /tmp/$VUE2_FILE
    iconv -f iso-8859-1 -t utf-8 /tmp/$VUE2_FILE > $VUE2_FILE
    rm /tmp/$VUE2_FILE
