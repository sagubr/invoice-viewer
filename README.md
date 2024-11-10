# InvoiceViewer

Esse projeto é a visualização do https://github.com/sagubr/consulta-nfe. Os dados da nota fiscal são processados > depois consultamos no banco de dados

'''
SELECT o.date, i.name, p.description, p.quantity, p.unit_of_measure, p.price
FROM products p
         INNER JOIN orders o ON p.order_id = o.id
         INNER JOIN issuers i ON o.issuer_id = i.id;
'''

a partir disso geramos o JSON e carregamos dentro da aplicação invoice-viewer
