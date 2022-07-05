import pandas as pd
import json

d = {}

url = 'http://kind.krx.co.kr/corpgeneral/corpList.do?method=download&searchType=13'
df_listing = pd.read_html(url, header=0)[0]
cols_ren = {'회사명':'Name', '종목코드':'Symbol', '업종':'Sector', '주요제품':'Industry', 
                    '상장일':'ListingDate', '결산월':'SettleMonth',  '대표자명':'Representative', 
                    '홈페이지':'HomePage', '지역':'Region', }
df = df_listing.rename(columns = cols_ren)
df['Symbol'] = df['Symbol'].apply(lambda x: '{:06d}'.format(x))
df['ListingDate'] = pd.to_datetime(df['ListingDate'])

for i, r in df.iterrows():
  d[r["Name"]] = r["Symbol"]
print(df)

with open('./code.json', 'w', encoding='utf-8') as f:
    json.dump(d, f, ensure_ascii=False)