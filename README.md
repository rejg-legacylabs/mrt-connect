# MRT Connect — Transport App

**A REJG Legacy Labs LLC product | Operated by Mission Ready Transport LLC**

MRT Connect is the internal operations platform for Mission Ready Transport — a premium transportation and logistics company serving HOH Foundation residents AND outside clients including government agencies, courts, treatment programs, and hospitals.

## Ownership & Licensing
- **IP Owner:** REJG Legacy Labs LLC (subsidiary of RE Jones Global LLC)
- **Operator:** Mission Ready Transport LLC (subsidiary of RE Jones Global LLC)
- **Contact:** rodney@rejonesglobal.com | 512-541-2395
- **Address:** 5900 Balcones Drive, Suite 100, Austin, TX 78731

## Platform Features
- Trip dispatch and scheduling
- Fleet and vehicle management
- Driver logs and inspections
- Outside Client Contracts (non-HOH clients)
- Document templates: Service Agreement, Trip Invoice, Driver Log, Vehicle Inspection, Client Onboarding
- Financial reporting

## Ecosystem Sync Schedule
| Time (CT) | From | To | Data |
|-----------|------|----|------|
| 6:15 AM | MRT Connect | Command Center Finance | Trip revenue, expenses, fleet metrics |
| 6:20 AM | MRT Connect | Pathways Hub OS | Available vehicles, HOH trip capacity |

## Development
```bash
git clone https://github.com/rejg-legacylabs/mrt-connect
cd mrt-connect
npm install
cp .env.example .env.local
npm run dev
```

Set in `.env.local`:
```
VITE_BASE44_APP_ID=69df258aeba93e4d9f3e697a
VITE_BASE44_APP_BASE_URL=https://mrt-connect.base44.app
```

---
Built on [Base44](https://base44.com) | REJG Legacy Labs LLC | Mission Ready Transport LLC | RE Jones Global LLC | May 2026
