import React from 'react'
import {Row,Col} from 'react-bootstrap'
import Chart1 from './Chart1'
import Chart2 from './Chart2'
import Chart3 from './Chart3'
import FinancePage from '../components/crawl/FinancePage'

const HomePage = () => {
  return (
    <div>
        <h1>흠냐링?</h1>
        <FinancePage/>
        <Row>
          <Col>
            <Chart1/>
          </Col>
          <Col>
            <Chart2/>
          </Col>
          <Col>
            <Chart3/>
          </Col>
        </Row>
    </div>
  )
} 

export default HomePage